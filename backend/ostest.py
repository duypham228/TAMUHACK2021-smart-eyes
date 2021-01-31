from PIL import Image
import os, os.path
import cv2

path = "known"

images = []
print(len(images))
for filename in os.listdir(path):
    img = cv2.imread(os.path.join(path,filename))
    if img is not None:
        images.append(img)

print(len(images))
print(images)
