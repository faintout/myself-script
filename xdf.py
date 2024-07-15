import requests
import time
import random
result = []
def send_request(activity_id):
    url = f"https://omc.koolearn.com/api/free-group/detail?_t=1700295545901&activityId={activity_id}"
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        dataInfo = data.get("data")
        if dataInfo != None:
            activity_id = data.get("data",{}).get("activityId")
            activity_name = data.get("data",{}).get("activityName")
            result.append({'activityId':activity_id,'activityName':activity_name})
        if data.get("code") == 0:
            with open("results.txt", "a") as file:
                file.write(f"activityId: {activity_id}, activityName: {activity_name}\n")
            print(f"Processed activityId: {activity_id}, activityName: {activity_name}")
        else:
            print(f"Request failed for activityId: {activity_id}, code: {data.get('msg')}")
start = 1500
end = 2500
total_requests = end - start
completed_requests = 0

for activity_id in range(start, end):
    send_request(activity_id)
    completed_requests += 1
    progress = (completed_requests / total_requests) * 100
    print(f"Progress: {progress:.2f}%")
    # 生成一个3到5秒之间的随机浮点数
    random_time = random.uniform(1, 3)
    time.sleep(random_time)  # 间隔2秒
print('')
print('统计列表：')
# 打印结果
for data in result:
    activity_id = data.get("activityId")
    activity_name = data.get("activityName")
    print(f'activityId: {activity_id}, activityName: {activity_name}')
print("")
print("获取结束！")
