import cv2
from ultralytics import YOLO
import numpy as np

# YOLO 모델 로드
model = YOLO("yolov8n.pt")

# 웹캠 열기
cap = cv2.VideoCapture(0)

# 이전 프레임의 바운딩 박스 저장
prev_boxes = []

def compute_iou(box1, box2):
    # box = [x1, y1, x2, y2]
    x1 = max(box1[0], box2[0])
    y1 = max(box1[1], box2[1])
    x2 = min(box1[2], box2[2])
    y2 = min(box1[3], box2[3])

    inter_area = max(0, x2 - x1) * max(0, y2 - y1)
    box1_area = (box1[2]-box1[0]) * (box1[3]-box1[1])
    box2_area = (box2[2]-box2[0]) * (box2[3]-box2[1])

    union_area = box1_area + box2_area - inter_area
    return inter_area / union_area if union_area != 0 else 0

recent_box = None

while True:
    ret, frame = cap.read()
    if not ret:
        break

    # YOLO 탐지 실행
    results = model(frame, verbose=False)
    detections = results[0].boxes.xyxy.cpu().numpy()  # x1, y1, x2, y2

    new_object_found = False

    for box in detections:
        ious = [compute_iou(box, pb) for pb in prev_boxes]
        max_iou = max(ious) if ious else 0

        # 기존에 없던 새로운 박스라고 판단
        if max_iou < 0.3:
            recent_box = box
            new_object_found = True
            break  # 하나만 추적하면 되므로 중단

    # 새 물체가 없다면 기존 박스 유지
    if recent_box is not None:
        x1, y1, x2, y2 = map(int, recent_box)
        cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)
        cv2.putText(frame, "New Object", (x1, y1 - 10),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2)

    # 다음 비교를 위한 박스 업데이트
    prev_boxes = detections

    # 출력
    cv2.imshow("YOLO New Object Tracker", frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
