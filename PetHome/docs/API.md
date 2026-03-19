# API 接口文档

## 概述
流浪动物救助领养平台 API 接口文档，遵循 RESTful 设计规范。

## 基础路径
`https://api.lovehomesite.com/v1`

## 通用响应格式
```json
{
  "success": true,
  "code": 200,
  "message": "请求成功",
  "data": {}
}
```

## 用户相关接口

### 1. 用户注册
- **POST** `/users/register`
- 请求参数：
  ```json
  {
    "username": "用户名",
    "email": "邮箱",
    "password": "密码",
    "phone": "手机号"
  }
  ```
- 响应参数：
  ```json
  {
    "userId": "用户ID",
    "username": "用户名",
    "email": "邮箱",
    "createTime": "创建时间"
  }
  ```

### 2. 用户登录
- **POST** `/users/login`
- 请求参数：
  ```json
  {
    "username": "用户名或邮箱",
    "password": "密码"
  }
  ```
- 响应参数：
  ```json
  {
    "token": "访问令牌",
    "userInfo": {
      "userId": "用户ID",
      "username": "用户名",
      "email": "邮箱",
      "avatar": "头像地址"
    }
  }
  ```

## 救助相关接口

### 3. 提交救助上报
- **POST** `/rescue/report`
- 需要认证
- 请求参数：
  ```json
  {
    "location": {
      "lat": "纬度",
      "lng": "经度",
      "address": "详细地址"
    },
    "animalType": "动物类型(cat/dog/bird/etc)",
    "animalCount": "数量",
    "condition": "状况描述",
    "photos": ["图片URL数组"],
    "contactInfo": "联系方式",
    "description": "详细描述"
  }
  ```

### 4. 获取救助列表
- **GET** `/rescue/list`
- 查询参数：
  - [可选] status: 状态过滤（pending/processing/completed）
  - [可选] page: 页码，默认为1
  - [可选] limit: 每页数量，默认为10
  - [可选] keyword: 搜索关键词

## 领养相关接口

### 5. 获取动物档案列表
- **GET** `/adoption/animals`
- 查询参数：
  - [可选] species: 物种（cat/dog/bird）
  - [可选] age: 年龄段（baby/juvenile/adult/senior）
  - [可选] gender: 性别（male/female）
  - [可选] sterilized: 是否绝育（true/false）
  - [可选] vaccinated: 是否接种疫苗（true/false）

### 6. 提交领养申请
- **POST** `/adoption/apply`
- 需要认证
- 请求参数：
  ```json
  {
    "animalId": "动物ID",
    "applicantInfo": {
      "livingCondition": "居住环境",
      "workSchedule": "作息时间",
      "petExperience": "养宠经验",
      "familySupport": "家庭支持情况"
    },
    "reason": "领养理由",
    "commitment": "承诺遵守领养协议"
  }
  ```

## 捐赠相关接口

### 7. 创建捐赠订单
- **POST** `/donation/create`
- 需要认证
- 请求参数：
  ```json
  {
    "donationType": "捐赠类型(money/material)",
    "amount": "金额或物品数量",
    "target": "捐赠目标(animals/hospital/equipment)",
    "anonymous": "是否匿名(true/false)"
  }
  ```

## 志愿者相关接口

### 8. 志愿者注册
- **POST** `/volunteers/register`
- 需要认证
- 请求参数：
  ```json
  {
    "realName": "真实姓名",
    "idCard": "身份证号",
    "skills": "技能",
    "availableTime": "可服务时间",
    "serviceArea": "服务区域"
  }
  ```

## 错误码定义

| 错误码 | 描述 |
|--------|------|
| 200 | 成功 |
| 400 | 请求参数错误 |
| 401 | 未授权访问 |
| 403 | 权限不足 |
| 404 | 资源不存在 |
| 500 | 服务器内部错误 |

## 认证方式
所有需要认证的接口都需要在请求头中加入：
```
Authorization: Bearer {access_token}
```

## 速率限制
- 每个IP每小时最多1000次请求
- 单个用户每分钟最多60次请求