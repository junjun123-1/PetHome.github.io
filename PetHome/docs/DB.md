# 数据库设计文档

流浪动物救助领养平台的数据库设计方案，使用关系型数据库(MySQL/PostgreSQL)。

## 1. 用户表 (users)
| 字段名 | 类型 | 描述 |
|--------|------|------|
| id | INT PRIMARY KEY AUTO_INCREMENT | 用户ID |
| username | VARCHAR(50) UNIQUE | 用户名 |
| email | VARCHAR(100) UNIQUE | 邮箱 |
| phone | VARCHAR(20) | 手机号 |
| password_hash | VARCHAR(255) | 密码哈希值 |
| avatar_url | VARCHAR(255) | 头像URL |
| real_name | VARCHAR(50) | 真实姓名 |
| id_card | VARCHAR(18) | 身份证号 |
| address | TEXT | 地址 |
| credit_score | INT DEFAULT 100 | 信用分数 |
| role | ENUM('user', 'volunteer', 'admin') DEFAULT 'user' | 用户角色 |
| status | ENUM('active', 'inactive', 'banned') DEFAULT 'active' | 状态 |
| created_at | TIMESTAMP DEFAULT CURRENT_TIMESTAMP | 创建时间 |
| updated_at | TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | 更新时间 |

## 2. 动物档案表 (animal_profiles)
| 字段名 | 类型 | 描述 |
|--------|------|------|
| id | INT PRIMARY KEY AUTO_INCREMENT | 动物ID |
| name | VARCHAR(50) | 动物名字 |
| species | ENUM('cat', 'dog', 'bird', 'rabbit', 'other') | 物种 |
| breed | VARCHAR(50) | 品种 |
| gender | ENUM('male', 'female') | 性别 |
| age | INT | 年龄（月） |
| size | ENUM('small', 'medium', 'large') | 体型 |
| weight | DECIMAL(5,2) | 体重(kg) |
| color | VARCHAR(50) | 毛色 |
| condition | TEXT | 健康状况 |
| personality | TEXT | 性格特点 |
| special_needs | TEXT | 特殊需求 |
| rescued_date | DATE | 救助日期 |
| rescued_location | VARCHAR(255) | 救助地点 |
| health_records | JSON | 健康记录 |
| vaccination_records | JSON | 疫苗记录 |
| sterilization_record | JSON | 绝育记录 |
| photos | JSON | 照片列表 |
| status | ENUM('available', 'reserved', 'adopted', 'deceased') DEFAULT 'available' | 状态 |
| created_by | INT REFERENCES users(id) | 创建人 |
| created_at | TIMESTAMP DEFAULT CURRENT_TIMESTAMP | 创建时间 |
| updated_at | TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | 更新时间 |

## 3. 救助上报表 (rescue_reports)
| 字段名 | 类型 | 描述 |
|--------|------|------|
| id | INT PRIMARY KEY AUTO_INCREMENT | 报告ID |
| reporter_id | INT REFERENCES users(id) | 上报人ID |
| animal_type | ENUM('cat', 'dog', 'bird', 'rabbit', 'other') | 动物类型 |
| animal_count | INT DEFAULT 1 | 数量 |
| location_lat | DECIMAL(10, 8) | 纬度 |
| location_lng | DECIMAL(11, 8) | 经度 |
| location_desc | TEXT | 位置描述 |
| condition | TEXT | 现状描述 |
| urgent | BOOLEAN DEFAULT FALSE | 是否紧急 |
| photos | JSON | 图片列表 |
| contact_info | VARCHAR(100) | 联系方式 |
| status | ENUM('reported', 'assigned', 'in_progress', 'completed', 'rejected') DEFAULT 'reported' | 状态 |
| assigned_volunteer_id | INT REFERENCES users(id) | 分配的志愿者ID |
| completed_notes | TEXT | 完成备注 |
| created_at | TIMESTAMP DEFAULT CURRENT_TIMESTAMP | 创建时间 |
| updated_at | TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | 更新时间 |

## 4. 领养申请表 (adoption_applications)
| 字段名 | 类型 | 描述 |
|--------|------|------|
| id | INT PRIMARY KEY AUTO_INCREMENT | 申请ID |
| applicant_id | INT REFERENCES users(id) | 申请人ID |
| animal_id | INT REFERENCES animal_profiles(id) | 申请动物ID |
| living_condition | TEXT | 居住条件 |
| work_schedule | TEXT | 工作时间安排 |
| pet_experience | TEXT | 养宠经验 |
| family_support | TEXT | 家庭支持情况 |
| reason | TEXT | 领养理由 |
| commitment | TEXT | 领养承诺 |
| status | ENUM('submitted', 'reviewing', 'approved', 'rejected', 'finalized', 'closed') DEFAULT 'submitted' | 状态 |
| trial_period_start | DATE | 试养开始日期 |
| trial_period_end | DATE | 试养结束日期 |
| adoption_date | DATE | 正式领养日期 |
| feedback_7days | TEXT | 7天反馈 |
| feedback_30days | TEXT | 30天反馈 |
| feedback_90days | TEXT | 90天反馈 |
| created_at | TIMESTAMP DEFAULT CURRENT_TIMESTAMP | 创建时间 |
| updated_at | TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | 更新时间 |

## 5. 捐赠记录表 (donations)
| 字段名 | 类型 | 描述 |
|--------|------|------|
| id | INT PRIMARY KEY AUTO_INCREMENT | 捐赠ID |
| donor_id | INT REFERENCES users(id) | 捐赠者ID |
| donation_type | ENUM('money', 'food', 'medicine', 'other') | 捐赠类型 |
| amount | DECIMAL(10, 2) | 金额/数量 |
| currency | VARCHAR(10) DEFAULT 'CNY' | 货币单位 |
| item_name | VARCHAR(100) | 物品名称（非货币捐赠） |
| target | VARCHAR(255) | 捐赠目标 |
| anonymous | BOOLEAN DEFAULT FALSE | 是否匿名 |
| transaction_id | VARCHAR(100) | 交易ID |
| blockchain_tx_id | VARCHAR(255) | 区块链交易ID |
| status | ENUM('pending', 'completed', 'failed') DEFAULT 'pending' | 状态 |
| created_at | TIMESTAMP DEFAULT CURRENT_TIMESTAMP | 创建时间 |

## 6. 志愿者表 (volunteers)
| 字段名 | 类型 | 描述 |
|--------|------|------|
| id | INT PRIMARY KEY AUTO_INCREMENT | 志愿者ID |
| user_id | INT REFERENCES users(id) | 用户ID |
| skills | JSON | 技能 |
| service_area | VARCHAR(255) | 服务区域 |
| available_time | JSON | 可服务时间 |
| emergency_contact | VARCHAR(100) | 紧急联系人及电话 |
| certification | JSON | 资格认证信息 |
| total_hours | INT DEFAULT 0 | 总服务时长 |
| rating | DECIMAL(3,2) DEFAULT 0.00 | 评分 |
| status | ENUM('pending', 'verified', 'suspended', 'revoked') DEFAULT 'pending' | 状态 |
| verified_at | TIMESTAMP NULL | 认证时间 |
| created_at | TIMESTAMP DEFAULT CURRENT_TIMESTAMP | 创建时间 |

## 7. 积分记录表 (points_records)
| 字段名 | 类型 | 描述 |
|--------|------|------|
| id | INT PRIMARY KEY AUTO_INCREMENT | 记录ID |
| user_id | INT REFERENCES users(id) | 用户ID |
| activity_type | ENUM('donation', 'report', 'volunteer', 'adoption', 'purchase', 'checkin') | 活动类型 |
| points_earned | INT | 获得积分 |
| points_used | INT DEFAULT 0 | 使用积分 |
| description | VARCHAR(255) | 描述 |
| related_id | INT | 相关记录ID |
| created_at | TIMESTAMP DEFAULT CURRENT_TIMESTAMP | 创建时间 |

## 8. 文创产品表 (merchandise)
| 字段名 | 类型 | 描述 |
|--------|------|------|
| id | INT PRIMARY KEY AUTO_INCREMENT | 产品ID |
| name | VARCHAR(100) | 产品名称 |
| description | TEXT | 产品描述 |
| price | DECIMAL(10, 2) | 价格 |
| stock | INT | 库存 |
| images | JSON | 图片列表 |
| category | VARCHAR(50) | 分类 |
| sales_count | INT DEFAULT 0 | 销售数量 |
| profit_to_donate | DECIMAL(5, 2) | 利润捐赠比例 |
| status | ENUM('active', 'inactive') DEFAULT 'active' | 状态 |
| created_at | TIMESTAMP DEFAULT CURRENT_TIMESTAMP | 创建时间 |
| updated_at | TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | 更新时间 |

## 9. 订单表 (orders)
| 字段名 | 类型 | 描述 |
|--------|------|------|
| id | INT PRIMARY KEY AUTO_INCREMENT | 订单ID |
| user_id | INT REFERENCES users(id) | 用户ID |
| order_type | ENUM('merchandise', 'donation', 'cloud_adoption') | 订单类型 |
| items | JSON | 订单项 |
| total_amount | DECIMAL(10, 2) | 总金额 |
| payment_method | VARCHAR(50) | 支付方式 |
| payment_status | ENUM('pending', 'paid', 'cancelled', 'refunded') DEFAULT 'pending' | 支付状态 |
| shipping_address | TEXT | 收货地址 |
| tracking_number | VARCHAR(100) | 物流单号 |
| status | ENUM('pending', 'confirmed', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending' | 订单状态 |
| created_at | TIMESTAMP DEFAULT CURRENT_TIMESTAMP | 创建时间 |
| updated_at | TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | 更新时间 |

## 10. 活动表 (events)
| 字段名 | 类型 | 描述 |
|--------|------|------|
| id | INT PRIMARY KEY AUTO_INCREMENT | 活动ID |
| title | VARCHAR(200) | 活动标题 |
| description | TEXT | 活动描述 |
| event_type | ENUM('adoption_day', 'lecture', 'volunteer_training', 'community') | 活动类型 |
| start_datetime | DATETIME | 开始时间 |
| end_datetime | DATETIME | 结束时间 |
| location | VARCHAR(255) | 活动地点 |
| capacity | INT | 容纳人数 |
| registered_count | INT DEFAULT 0 | 报名人数 |
| organizer | VARCHAR(100) | 组织者 |
| registration_fee | DECIMAL(10, 2) DEFAULT 0.00 | 报名费 |
| status | ENUM('planning', 'open', 'full', 'ongoing', 'completed', 'cancelled') DEFAULT 'planning' | 状态 |
| created_at | TIMESTAMP DEFAULT CURRENT_TIMESTAMP | 创建时间 |
| updated_at | TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | 更新时间 |

## 11. 活动报名表 (event_registrations)
| 字段名 | 类型 | 描述 |
|--------|------|------|
| id | INT PRIMARY KEY AUTO_INCREMENT | 报名ID |
| event_id | INT REFERENCES events(id) | 活动ID |
| user_id | INT REFERENCES users(id) | 用户ID |
| registration_date | TIMESTAMP DEFAULT CURRENT_TIMESTAMP | 报名时间 |
| status | ENUM('registered', 'attended', 'cancelled') DEFAULT 'registered' | 状态 |

## 关键索引
- 在 [users.email], [users.phone] 上创建唯一索引
- 在 [animal_profiles.status] 上创建索引
- 在 [rescue_reports.status], [rescue_reports.location_lat], [rescue_reports.location_lng] 上创建索引
- 在 [adoption_applications.status], [adoption_applications.applicant_id] 上创建索引
- 在 [donations.donor_id], [donations.status] 上创建索引
- 在 [orders.user_id], [orders.status] 上创建索引
- 在 [events.start_datetime], [events.status] 上创建索引