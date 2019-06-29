SET NAMES UTF8;
DROP DATABASE IF EXISTS cv;
CREATE DATABASE cv CHARSET=UTF8;
USE cv;
#----------------------------用户信息表
CREATE TABLE cv_user(
	uid INT PRIMARY KEY NOT NULL AUTO_INCREMENT, # 用户的ID，为用户的唯一标识，由系统自动生成
	upwd VARCHAR(32),
	email VARCHAR(64),
	phone VARCHAR(16) NOT NULL UNIQUE, #手机号码
	birthday DATE,	#用户生日
	avatar VARCHAR(128), #头像图片路径
	user_name  VARCHAR(32), #用户姓名
	gender INT #性别 0-女 1-男
);
INSERT INTO cv_user VALUES(null,'520keyide','1765464541@163.com','17600774441','1999-05-20',null,'杨老板',1);
INSERT INTO cv_user VALUES(null,'520keyide','sadad41@163.com','17424442441','1999-08-20',null,'杨宁',1);
INSERT INTO cv_user VALUES(null,'520keyide','sadsad4441@163.com','15445574441','1997-05-10',null,'泽宁',1);
INSERT INTO cv_user VALUES(null,'520keyide','sadsads41@163.com','17645654661','1993-07-11',null,'石洁安',1);
INSERT INTO cv_user VALUES(null,'520keyide','sadsadsad@163.com','17605464341','1989-05-70',null,'向开娜',1);
INSERT INTO cv_user VALUES(null,'520keyide','sadsagfc22@163.com','17601231341','1997-2-5',null,'张心',1);
#----------------------------用户地址表
CREATE TABLE cv_receiver_address(
	aid INT PRIMARY KEY AUTO_INCREMENT,
	user_id INT, #用户编号
	receiver VARCHAR(16),#接收人姓名
	province VARCHAR(16), #省份
	city VARCHAR(16), #市
	county VARCHAR(16),#县
	address VARCHAR(128), #详细地址
	cellphone VARCHAR(16), #手机
	fixedphone VARCHAR(16),#固定电话
	postcode CHAR(6),#邮编
	tag VARCHAR(16),#标签名
	is_default BOOLEAN#是否为当前用户的默认收货地址
	#FOREIGN KEY(user_id) REFERENCES cv_user(uid)
);
INSERT INTO cv_receiver_address VALUES(null,1,'杨泽宁','陕西省','西安市','碑林区','长安三号北门驿站','17600774441',null,'000000',null,true);

#-----------------------------服饰类别表
CREATE TABLE cv_costume_family(
	fid INT PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(32)#类别名称
);
INSERT INTO cv_costume_family VALUES(null,'鞋子');
INSERT INTO cv_costume_family VALUES(null,'外套');
INSERT INTO cv_costume_family VALUES(null,'T恤');
INSERT INTO cv_costume_family VALUES(null,'穿戴');
INSERT INTO cv_costume_family VALUES(null,'优惠');
INSERT INTO cv_costume_family VALUES(null,'经典款');
#--------------------------------商品表
CREATE TABLE cv_costume(
	lid INT PRIMARY KEY AUTO_INCREMENT,
	family_id INT,#所属型号家族编号 穿戴类
	gender CHAR(2),#穿着性别1-男 2-女 3-儿童 4-男女同款
	product_id VARCHAR(30),#产品编号
	title VARCHAR(128), #主标题
	subtitle VARCHAR(128),#副标题
	price DECIMAL(10,2),#价格
	promise VARCHAR(128),#服务承诺
	size VARCHAR(128),#尺码
	name VARCHAR(32),#商品名称
	category VARCHAR(32),#所属分类
	details VARCHAR(1024),#产品详细说明
	shelf_time BIGINT, #上架时间
	sold_count INT,#已出售的数量
	is_onsale BOOLEAN#是否销售中
	#FOREIGN KEY(family_id) REFERENCES cv_costume_family(fid),
	#FOREIGN KEY(family_id_2) REFERENCES cv_costume_family(fid)
);
INSERT INTO cv_costume VALUES (NULL, '1', '1', '165653C986', '【男的】Cons All Star Pro BB 男款', NULL, '999', '抽签预计6月4日 开始，想要了解更多精彩发售讯息，即刻关注CONVERSE官方微信账号。', '[39,40,40.5,41,42,42.5,43,44,44.5,45,46,46.5,47.5]', 'ALL STAR PRO BB', 'ALLSTAR', '[\"采用Quadifit织法而成的鞋面舒适有型\",\"大底凹凸纹路稳固承托运动中的双足\",\"插入式的NIKE React内核轻盈回弹\",\"彩色的鞋围条等细节活泼休闲\",\"鞋侧及可透视鞋底印有星箭图案\",\"篮球风格重磅回归，这个夏季Converse和你一起抢占球场精彩表现。\"]', NULL, '0', '0');
INSERT INTO cv_costume VALUES (NULL, '1', '1', '165591C082', '【男的】Converse  Cons Star Series BB  男款', NULL, '669', '篮球风格重磅回归，这个夏季Converse和你一起抢占球场精彩表现。', '[39,40,40.5,41,42,42.5,43,44,44.5,45,46,46.5,47.5]', 'ALL STAR PRO BB', 'ALLSTAR', '[\"高质感的材质打造舒适透气的运动体验\",\"后跟条与鞋围条以彩色点缀活力醒目\",\"发泡结合橡胶大底承托双足稳固轻盈\",\"侧边醒目的星箭经典有型\",\"鞋舌标印有系列字母图案\"]', NULL, '0', '0');

#-------------------------------用户购物车表
CREATE TABLE cv_shopping_cart(
	cid INT PRIMARY KEY AUTO_INCREMENT,
	user_id INT, #用户编号
	product_id INT, # 商品编号
	count INT, # 购买数量
	size VARCHAR(4)#尺码
	#FOREIGN KEY(user_id) REFERENCES cv_user(uid),
	#FOREIGN KEY(product_id) REFERENCES cv_costume(lid)
);
#-------------------------------用户订单表
CREATE TABLE cv_order(
	aid INT PRIMARY KEY AUTO_INCREMENT,
	user_id INT,#用户编号
	address_id INT,
	status INT, #订单状态 1等待付款 2等待发货 3运输中 4已签收 5已取消
	order_time BIGINT,#下单时间
	pay_time BIGINT,#付款时间
	deliver_time BIGINT,#发货时间
	received_time BIGINT#签收时间
	#FOREIGN KEY(user_id) REFERENCES cv_user(uid),
	#FOREIGN KEY(address_id) REFERENCES cv_receiver_address(aid)
);
#------------------------------用户订单详情表
CREATE TABLE cv_order_detail(
	did INT PRIMARY KEY AUTO_INCREMENT,
	order_id INT, #订单编号
	product_id INT, #产品编号
	count INT, #购买数量
	size VARCHAR(4)#尺码
	#FOREIGN KEY(order_id) REFERENCES cv_order(aid),
	#FOREIGN KEY(product_id) REFERENCES cv_costume(lid)
);


#----------------------------商品详情图表
CREATE TABLE cv_costume_pic(
	pid INT PRIMARY KEY AUTO_INCREMENT,
	costume_id INT,#服饰编号
	sm VARCHAR(128),#小图片路径
	md VARCHAR(128),#中图片路径
	lg VARCHAR(128)#大图片路径
	#FOREIGN KEY(costume_id) REFERENCES cv_costume(lid)
);

#----------------------------首页轮播图表
CREATE TABLE cv_index_carousel(
	cid INT PRIMARY KEY AUTO_INCREMENT,
	img VARCHAR(128),#图片路径
	title VARCHAR(64),#图片描述
	href VARCHAR(128)#图片链接
);
INSERT INTO cv_index_carousel VALUES(null,'image/pc/aspbb_kv_pc_pre_20190530.jpg','Pro BB','');
INSERT INTO cv_index_carousel VALUES(null,'image/pc/star_series_kv_pc_190528.jpg','STAR SERIES','');
INSERT INTO cv_index_carousel VALUES(null,'image/pc/os_dimension_kv_pc_190426.jpg','真的有故事','');
INSERT INTO cv_index_carousel VALUES(null,'image/pc/jp_gold_kv_pc_190426.jpg','JP GOLD','');
INSERT INTO cv_index_carousel VALUES(null,'image/pc/lbhd_kv_pc_190401.jpg','LABELHOOD','');


#---------------------------首页商品栏目录
CREATE TABLE xz_index_product(
	pid INT PRIMARY KEY AUTO_INCREMENT,
	title VARCHAR(64),#商品标题
	details VARCHAR(128),#详细描述
	pic VARCHAR(128),#图片
	price DECIMAL(10,2),#商品价格
	href VARCHAR(128),
	seq_recommended TINYINT,
	seq_new_arrival TINYINT,
	seq_top_sale TINYINT
);
#--------------------------------------