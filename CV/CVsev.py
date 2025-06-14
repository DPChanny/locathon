from flask import Flask, request, Response, jsonify
import cv2
import numpy as np
from ultralytics import YOLO
from deep_sort_realtime.deepsort_tracker import DeepSort
import threading
import time
import logging

# Flask 기본 로그 비활성화
log = logging.getLogger('werkzeug')
log.setLevel(logging.ERROR)

app = Flask(__name__)

# YOLO, DeepSORT 초기화
model = YOLO("yolov8s.pt")
tracker = DeepSort(max_age=20, n_init=4)

# 전역 변수
frame_count = 0
fps_start_time = time.time()
latest_frame = None
seen_ids = set()
lock = threading.Lock()

@app.route('/')
def index():
    return '''
    <html>
    <head><title>YOLOv8 스트리밍</title></head>
    <body>
        <h2>YOLO + DeepSORT 실시간 추적</h2>
        <img src="/video_feed" width="640">
    </body>
    </html>
    '''

@app.route('/upload', methods=['POST'])
def upload():
    global latest_frame, seen_ids, frame_count, fps_start_time

    if 'image' not in request.files:
        return jsonify({'error': '이미지 없음'}), 400

    file = request.files['image']
    npimg = np.frombuffer(file.read(), np.uint8)
    frame = cv2.imdecode(npimg, cv2.IMREAD_COLOR)

    # YOLO 감지 (매 프레임마다)
    results = model.predict(source=frame, conf=0.4, iou=0.4, verbose=False)[0]
    detections = []
    for box in results.boxes:
        x1, y1, x2, y2 = map(int, box.xyxy[0])
        conf = box.conf[0].item()
        cls = box.cls[0].item()
        detections.append(([x1, y1, x2 - x1, y2 - y1], conf, cls, None))

    # DeepSORT 추적
    tracks = tracker.update_tracks(detections, frame=frame)
    for tr in tracks:
        if not tr.is_confirmed() or tr.time_since_update > 1:
            continue

        tid = tr.track_id
        if tid not in seen_ids:
            print(f"[NEW] 새로운 객체 감지됨 - ID: {tid}")
            seen_ids.add(tid)

        x1, y1, w, h = map(int, tr.to_ltwh())
        x2, y2 = x1 + w, y1 + h
        cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)
        cv2.putText(frame, f"ID:{tid}", (x1, y1 - 5), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 255, 255), 1)

    # 최신 프레임 저장
    with lock:
        latest_frame = frame.copy()

    # FPS 측정 (꺼도 됌)
    frame_count += 1
    elapsed = time.time() - fps_start_time
    if elapsed >= 5.0:
        fps = frame_count / elapsed
        print(f"현재 처리 FPS: {fps:.2f}")
        frame_count = 0
        fps_start_time = time.time()

    return jsonify({'status': 'ok'})

# 웹 스트리밍 제너레이터
def stream_generator():
    global latest_frame
    while True:
        with lock:
            if latest_frame is None:
                continue
            _, buffer = cv2.imencode('.jpg', latest_frame)
            frame_bytes = buffer.tobytes()
        yield (b'--frame\r\nContent-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n')
        time.sleep(0.03)

@app.route('/video_feed')
def video_feed():
    return Response(stream_generator(), mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
