// ========== Toast 通知系统 ==========
const categoryTranslations = {
  zh: {
    "smartphones": "智能手机",
    "electronics": "电子产品",
    "laptops": "笔记本电脑",
    "watches": "手表",
    "shoes": "鞋履",
    "fragrances": "香水",
    "skincare": "护肤品",
    "men's products": "男士商品",
    "women's products": "女士商品",
    "jewelery": "珠宝首饰",
    "Hoodies": "连帽衫",
    "Jackets": "夹克",
    "Pants": "裤装",
    "T-shirts": "T 恤"
  },
  es: {
    "smartphones": "teléfonos inteligentes",
    "electronics": "electrónica",
    "laptops": "portátiles",
    "watches": "relojes",
    "shoes": "zapatos",
    "fragrances": "fragancias",
    "skincare": "cuidado de la piel",
    "men's products": "productos para hombre",
    "women's products": "productos para mujer",
    "jewelery": "joyería",
    "Hoodies": "sudaderas con capucha",
    "Jackets": "chaquetas",
    "Pants": "pantalones",
    "T-shirts": "camisetas"
  },
  fr: {
    "smartphones": "smartphones",
    "electronics": "électronique",
    "laptops": "ordinateurs portables",
    "watches": "montres",
    "shoes": "chaussures",
    "fragrances": "parfums",
    "skincare": "soins de la peau",
    "men's products": "produits pour hommes",
    "women's products": "produits pour femmes",
    "jewelery": "bijoux",
    "Hoodies": "sweats à capuche",
    "Jackets": "vestes",
    "Pants": "pantalons",
    "T-shirts": "t-shirts"
  }
};

const productTitleTranslations = {
  zh: {
    "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops": "Fjallraven Foldsack No. 1 双肩包，可放 15 英寸笔记本",
    "Mens Casual Premium Slim Fit T-Shirts": "男士高级休闲修身 T 恤",
    "Mens Cotton Jacket": "男士棉质夹克",
    "Mens Casual Slim Fit": "男士休闲修身上衣",
    "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet": "John Hardy 女士 Naga 金银龙形手链",
    "Solid Gold Petite Micropave": "纯金小巧密镶饰品",
    "White Gold Plated Princess": "白金镀层公主戒指",
    "Pierced Owl Rose Gold Plated Stainless Steel Double": "Pierced Owl 玫瑰金镀层不锈钢耳饰",
    "WD 2TB Elements Portable External Hard Drive - USB 3.0": "WD 2TB Elements USB 3.0 移动硬盘",
    "SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s": "SanDisk SSD PLUS 1TB SATA III 内置固态硬盘",
    "Silicon Power 256GB SSD 3D NAND A55 SLC Cache Performance Boost SATA III 2.5": "Silicon Power 256GB 3D NAND A55 SATA III 2.5 英寸固态硬盘",
    "WD 4TB Gaming Drive Works with Playstation 4 Portable External Hard Drive": "WD 4TB PlayStation 4 游戏移动硬盘",
    "Acer SB220Q bi 21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin": "Acer SB220Q 21.5 英寸全高清 IPS 超薄显示器",
    "Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor": "三星 49 英寸 CHG90 144Hz 曲面游戏显示器",
    "BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coats": "BIYLACLESEN 女士三合一滑雪冬季外套",
    "Lock and Love Women's Removable Hooded Faux Leather Jacket": "Lock and Love 女士可拆帽仿皮夹克",
    "Rain Jacket Women Windbreaker Striped Climbing Raincoats": "女士条纹登山防风雨衣",
    "MBJ Women's Solid Short Sleeve Boat Neck V": "MBJ 女士纯色短袖船领上衣",
    "Opna Women's Short Sleeve Moisture": "Opna 女士短袖速干上衣",
    "DANVOUY Womens T Shirt Casual Cotton Short": "DANVOUY 女士休闲棉质短袖 T 恤",
    "Rose Printed Hoodie": "玫瑰印花连帽衫",
    "Basic Slim Fit Chinos Trousers": "基础修身卡其裤",
    "Carpenter Jeans": "工装牛仔裤",
    "Black Colored Sweatpants With Elastic Hems": "黑色松紧裤脚运动裤",
    "Oversize Faux Leather Biker Jacket": "宽松仿皮机车夹克",
    "Oversized Denim Jacket": "宽松牛仔夹克",
    "Black Hoodie With Contrast Graphic": "黑色撞色图案连帽衫",
    "Lightweight Zipped Bomber Jacket": "轻薄拉链飞行夹克",
    "Hot Stuff Hoodie": "Hot Stuff 连帽衫",
    "Naruto Itachi Print T-shirt": "火影鼬印花 T 恤",
    "Basic High-Neck Puff Jacket": "基础高领蓬松夹克",
    "Orange Starter Logo T-shirt": "橙色 Starter 标志 T 恤",
    "Tupac California Love T-Shirt": "Tupac California Love T 恤",
    "Cropped Satin Bomber Jacket": "短款缎面飞行夹克",
    "NMD_R1 Shoes": "NMD_R1 运动鞋",
    "NMD_R1 SHOES": "NMD_R1 运动鞋",
    "SL ANDRIDGE SHOES": "SL ANDRIDGE 运动鞋",
    "OVERSIZE SHADOW TREFOIL TEE": "宽松阴影三叶草 T 恤",
    "HARDEN VOL. 4 SHOES": "Harden Vol. 4 篮球鞋",
    "TREFOIL TEE": "三叶草 T 恤",
    "iPhone 9": "iPhone 9",
    "iPhone X": "iPhone X",
    "Samsung Universe 9": "三星 Universe 9",
    "OPPOF19": "OPPO F19",
    "Huawei P30": "华为 P30",
    "MacBook Pro": "MacBook Pro",
    "Samsung Galaxy Book": "三星 Galaxy Book",
    "Microsoft Surface Laptop 4": "微软 Surface Laptop 4",
    "Infinix INBOOK": "Infinix INBOOK 笔记本",
    "HP Pavilion 15-DK1056WM": "惠普 Pavilion 15-DK1056WM 笔记本",
    "perfume Oil": "香氛精油",
    "Brown Perfume": "棕色香水",
    "Fog Scent Xpressio Perfume": "Fog Scent Xpressio 香水",
    "Non-Alcoholic Concentrated Perfume Oil": "无酒精浓缩香氛油",
    "Eau De Perfume Spray": "淡香精喷雾",
    "Hyaluronic Acid Serum": "玻尿酸精华",
    "Tree Oil 30ml": "茶树精油 30ml",
    "Oil Free Moisturizer 100ml": "无油保湿乳 100ml",
    "Skin Beauty Serum.": "美肌精华",
    "Freckle Treatment Cream- 15gm": "祛斑护理霜 15g",
    "Leather Straps Wristwatch": "皮表带腕表",
    "Waterproof Leather Brand Watch": "防水皮表带品牌手表",
    "Royal Blue Premium Watch": "皇家蓝高级手表",
    "Leather Strap Skeleton Watch": "皮表带镂空机械表",
    "Stainless Steel Wrist Watch": "不锈钢腕表"
  },
  es: {
    "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops": "Mochila Fjallraven Foldsack No. 1, para portátiles de 15 pulgadas",
    "Mens Casual Premium Slim Fit T-Shirts": "Camisetas ajustadas premium casuales para hombre",
    "Mens Cotton Jacket": "Chaqueta de algodón para hombre",
    "Mens Casual Slim Fit": "Prenda casual ajustada para hombre",
    "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet": "Pulsera John Hardy Legends Naga de oro y plata para mujer",
    "Solid Gold Petite Micropave": "Joya pequeña de oro macizo con micropavé",
    "White Gold Plated Princess": "Anillo princesa chapado en oro blanco",
    "Pierced Owl Rose Gold Plated Stainless Steel Double": "Pendientes dobles Pierced Owl de acero inoxidable chapado en oro rosa",
    "WD 2TB Elements Portable External Hard Drive - USB 3.0": "Disco duro externo portátil WD Elements 2TB - USB 3.0",
    "SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s": "SSD interno SanDisk SSD PLUS 1TB - SATA III 6 Gb/s",
    "Silicon Power 256GB SSD 3D NAND A55 SLC Cache Performance Boost SATA III 2.5": "SSD Silicon Power 256GB 3D NAND A55 SATA III 2.5",
    "WD 4TB Gaming Drive Works with Playstation 4 Portable External Hard Drive": "Disco duro portátil WD 4TB Gaming Drive compatible con Playstation 4",
    "Acer SB220Q bi 21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin": "Monitor Acer SB220Q bi 21.5 pulgadas Full HD IPS ultrafino",
    "Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor": "Monitor gaming curvo Samsung CHG90 de 49 pulgadas 144Hz",
    "BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coats": "Chaqueta de snowboard 3 en 1 de invierno para mujer BIYLACLESEN",
    "Lock and Love Women's Removable Hooded Faux Leather Jacket": "Chaqueta de cuero sintético con capucha desmontable para mujer Lock and Love",
    "Rain Jacket Women Windbreaker Striped Climbing Raincoats": "Chaqueta impermeable cortavientos a rayas para mujer",
    "MBJ Women's Solid Short Sleeve Boat Neck V": "Top MBJ liso de manga corta y cuello barco para mujer",
    "Opna Women's Short Sleeve Moisture": "Camiseta Opna de manga corta transpirable para mujer",
    "DANVOUY Womens T Shirt Casual Cotton Short": "Camiseta casual de algodón de manga corta para mujer DANVOUY",
    "Rose Printed Hoodie": "Sudadera con capucha estampado de rosas",
    "Basic Slim Fit Chinos Trousers": "Pantalones chinos básicos ajustados",
    "Carpenter Jeans": "Vaqueros carpintero",
    "Black Colored Sweatpants With Elastic Hems": "Pantalones deportivos negros con bajos elásticos",
    "Oversize Faux Leather Biker Jacket": "Chaqueta biker oversize de cuero sintético",
    "Oversized Denim Jacket": "Chaqueta vaquera oversize",
    "Black Hoodie With Contrast Graphic": "Sudadera negra con gráfico en contraste",
    "Lightweight Zipped Bomber Jacket": "Chaqueta bomber ligera con cremallera",
    "Hot Stuff Hoodie": "Sudadera Hot Stuff",
    "Naruto Itachi Print T-shirt": "Camiseta con estampado Naruto Itachi",
    "Basic High-Neck Puff Jacket": "Chaqueta acolchada básica de cuello alto",
    "Orange Starter Logo T-shirt": "Camiseta naranja con logotipo Starter",
    "Tupac California Love T-Shirt": "Camiseta Tupac California Love",
    "NMD_R1 Shoes": "Zapatillas NMD_R1",
    "NMD_R1 SHOES": "Zapatillas NMD_R1",
    "SL ANDRIDGE SHOES": "Zapatillas SL ANDRIDGE",
    "OVERSIZE SHADOW TREFOIL TEE": "Camiseta oversize Shadow Trefoil",
    "HARDEN VOL. 4 SHOES": "Zapatillas Harden Vol. 4",
    "TREFOIL TEE": "Camiseta Trefoil",
    "Samsung Universe 9": "Samsung Universe 9",
    "Samsung Galaxy Book": "Samsung Galaxy Book",
    "Microsoft Surface Laptop 4": "Microsoft Surface Laptop 4",
    "Infinix INBOOK": "Portátil Infinix INBOOK",
    "HP Pavilion 15-DK1056WM": "Portátil HP Pavilion 15-DK1056WM",
    "perfume Oil": "Aceite perfumado",
    "Brown Perfume": "Perfume marrón",
    "Fog Scent Xpressio Perfume": "Perfume Fog Scent Xpressio",
    "Non-Alcoholic Concentrated Perfume Oil": "Aceite perfumado concentrado sin alcohol",
    "Eau De Perfume Spray": "Spray de eau de parfum",
    "Hyaluronic Acid Serum": "Sérum de ácido hialurónico",
    "Tree Oil 30ml": "Aceite de árbol 30ml",
    "Oil Free Moisturizer 100ml": "Hidratante sin aceite 100ml",
    "Skin Beauty Serum.": "Sérum de belleza para la piel",
    "Freckle Treatment Cream- 15gm": "Crema tratamiento antimanchas 15g",
    "Leather Straps Wristwatch": "Reloj de pulsera con correa de cuero",
    "Waterproof Leather Brand Watch": "Reloj impermeable de marca con correa de cuero",
    "Royal Blue Premium Watch": "Reloj premium azul real",
    "Leather Strap Skeleton Watch": "Reloj esqueleto con correa de cuero",
    "Stainless Steel Wrist Watch": "Reloj de pulsera de acero inoxidable"
  },
  fr: {
    "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops": "Sac à dos Fjallraven Foldsack No. 1, compatible ordinateur 15 pouces",
    "Mens Casual Premium Slim Fit T-Shirts": "T-shirts ajustés premium décontractés pour homme",
    "Mens Cotton Jacket": "Veste en coton pour homme",
    "Mens Casual Slim Fit": "Haut décontracté ajusté pour homme",
    "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet": "Bracelet chaîne John Hardy Legends Naga or et argent pour femme",
    "Solid Gold Petite Micropave": "Bijou petite taille en or massif micropavé",
    "White Gold Plated Princess": "Bague princesse plaquée or blanc",
    "Pierced Owl Rose Gold Plated Stainless Steel Double": "Boucles d'oreilles doubles Pierced Owl acier inoxydable plaqué or rose",
    "WD 2TB Elements Portable External Hard Drive - USB 3.0": "Disque dur externe portable WD Elements 2 To - USB 3.0",
    "SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s": "SSD interne SanDisk SSD PLUS 1 To - SATA III 6 Gb/s",
    "Silicon Power 256GB SSD 3D NAND A55 SLC Cache Performance Boost SATA III 2.5": "SSD Silicon Power 256 Go 3D NAND A55 SATA III 2.5",
    "WD 4TB Gaming Drive Works with Playstation 4 Portable External Hard Drive": "Disque dur portable WD 4 To Gaming Drive compatible Playstation 4",
    "Acer SB220Q bi 21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin": "Écran Acer SB220Q bi 21,5 pouces Full HD IPS ultra-fin",
    "Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor": "Écran gaming incurvé Samsung CHG90 49 pouces 144Hz",
    "BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coats": "Veste de snowboard 3 en 1 d'hiver pour femme BIYLACLESEN",
    "Lock and Love Women's Removable Hooded Faux Leather Jacket": "Veste femme en simili cuir avec capuche amovible Lock and Love",
    "Rain Jacket Women Windbreaker Striped Climbing Raincoats": "Veste de pluie coupe-vent rayée pour femme",
    "MBJ Women's Solid Short Sleeve Boat Neck V": "Haut MBJ uni manches courtes col bateau pour femme",
    "Opna Women's Short Sleeve Moisture": "T-shirt manches courtes respirant Opna pour femme",
    "DANVOUY Womens T Shirt Casual Cotton Short": "T-shirt femme DANVOUY décontracté en coton manches courtes",
    "Rose Printed Hoodie": "Sweat à capuche imprimé roses",
    "Basic Slim Fit Chinos Trousers": "Pantalon chino ajusté basique",
    "Carpenter Jeans": "Jean charpentier",
    "Black Colored Sweatpants With Elastic Hems": "Pantalon de survêtement noir à ourlets élastiques",
    "Oversize Faux Leather Biker Jacket": "Veste biker oversize en simili cuir",
    "Oversized Denim Jacket": "Veste en jean oversize",
    "Black Hoodie With Contrast Graphic": "Sweat noir à capuche avec motif contrasté",
    "Lightweight Zipped Bomber Jacket": "Bomber léger zippé",
    "Hot Stuff Hoodie": "Sweat à capuche Hot Stuff",
    "Naruto Itachi Print T-shirt": "T-shirt imprimé Naruto Itachi",
    "Basic High-Neck Puff Jacket": "Doudoune basique col montant",
    "Orange Starter Logo T-shirt": "T-shirt orange logo Starter",
    "Tupac California Love T-Shirt": "T-shirt Tupac California Love",
    "NMD_R1 Shoes": "Chaussures NMD_R1",
    "NMD_R1 SHOES": "Chaussures NMD_R1",
    "SL ANDRIDGE SHOES": "Chaussures SL ANDRIDGE",
    "OVERSIZE SHADOW TREFOIL TEE": "T-shirt oversize Shadow Trefoil",
    "HARDEN VOL. 4 SHOES": "Chaussures Harden Vol. 4",
    "TREFOIL TEE": "T-shirt Trefoil",
    "Samsung Universe 9": "Samsung Universe 9",
    "Samsung Galaxy Book": "Samsung Galaxy Book",
    "Microsoft Surface Laptop 4": "Microsoft Surface Laptop 4",
    "Infinix INBOOK": "Ordinateur portable Infinix INBOOK",
    "HP Pavilion 15-DK1056WM": "Ordinateur portable HP Pavilion 15-DK1056WM",
    "perfume Oil": "Huile parfumée",
    "Brown Perfume": "Parfum brun",
    "Fog Scent Xpressio Perfume": "Parfum Fog Scent Xpressio",
    "Non-Alcoholic Concentrated Perfume Oil": "Huile parfumée concentrée sans alcool",
    "Eau De Perfume Spray": "Spray eau de parfum",
    "Hyaluronic Acid Serum": "Sérum à l'acide hyaluronique",
    "Tree Oil 30ml": "Huile d'arbre 30 ml",
    "Oil Free Moisturizer 100ml": "Hydratant sans huile 100 ml",
    "Skin Beauty Serum.": "Sérum beauté de la peau",
    "Freckle Treatment Cream- 15gm": "Crème traitement des taches 15 g",
    "Leather Straps Wristwatch": "Montre-bracelet à bracelet cuir",
    "Waterproof Leather Brand Watch": "Montre de marque étanche à bracelet cuir",
    "Royal Blue Premium Watch": "Montre premium bleu royal",
    "Leather Strap Skeleton Watch": "Montre squelette à bracelet cuir",
    "Stainless Steel Wrist Watch": "Montre-bracelet en acier inoxydable"
  }
};

const productDescriptionTranslations = {
  zh: {
    "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops": "适合日常使用和森林徒步的理想背包。加厚夹层可收纳 15 英寸笔记本，也能轻松放下日常用品。",
    "Mens Casual Premium Slim Fit T-Shirts": "修身版型，撞色插肩长袖，三粒扣亨利领。面料轻薄柔软，透气舒适，适合日常休闲穿搭。",
    "Mens Cotton Jacket": "适合春秋冬季的实用外套，可用于工作、徒步、露营、攀岩、骑行、旅行等多种户外场景。",
    "Mens Casual Slim Fit": "屏幕显示颜色可能与实物略有不同。由于每个人体型不同，请参考产品详情中的尺码信息。",
    "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet": "来自 Legends 系列，Naga 灵感源自守护海洋珍珠的神话水龙。向内佩戴寓意爱与富足，向外佩戴寓意守护。",
    "Solid Gold Petite Micropave": "满意保证。订单可在 30 天内退换，由美国 Hafeez Center 设计并销售。",
    "White Gold Plated Princess": "经典公主款订婚戒指，适合作为订婚、婚礼、纪念日或情人节礼物。",
    "Pierced Owl Rose Gold Plated Stainless Steel Double": "玫瑰金镀层双喇叭耳饰，采用 316L 不锈钢制成。",
    "WD 2TB Elements Portable External Hard Drive - USB 3.0": "支持 USB 3.0 和 USB 2.0，传输快速，可提升电脑性能并提供大容量存储。",
    "SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s": "轻松升级电脑，带来更快的启动、关机、应用加载和响应速度。",
    "Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor": "49 英寸超宽曲面电竞显示器，量子点技术、HDR 支持和 144Hz 刷新率带来沉浸体验。",
    "Silicon Power 256GB SSD 3D NAND A55 SLC Cache Performance Boost SATA III 2.5": "采用 3D NAND 闪存，带来高速传输、更快启动和更好的系统表现，并支持 TRIM、垃圾回收、RAID 与 ECC。",
    "WD 4TB Gaming Drive Works with Playstation 4 Portable External Hard Drive": "扩展 PS4 游戏空间，设置快速简单，外观简洁并提供大容量存储。",
    "Acer SB220Q bi 21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin": "21.5 英寸 Full HD IPS 超薄显示器，支持 Radeon FreeSync、75Hz 刷新率和窄边框设计。",
    "BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coats": "美标尺码三合一滑雪夹克，带可拆卸保暖内胆、防风防水设计和多个拉链口袋，适合不同季节。",
    "Lock and Love Women's Removable Hooded Faux Leather Jacket": "仿皮材质兼具风格与舒适度，带可拆卸连帽、前袋和腰部纽扣细节。",
    "Rain Jacket Women Windbreaker Striped Climbing Raincoats": "轻便雨衣适合旅行和日常穿着，带连帽、可调节抽绳腰部、纽扣拉链门襟和实用侧袋。",
    "MBJ Women's Solid Short Sleeve Boat Neck V": "轻薄弹力面料带来舒适穿着体验，袖口和领口采用罗纹设计，底摆双线缝制。",
    "Opna Women's Short Sleeve Moisture": "轻量透气的吸湿排汗短袖上衣，V 领剪裁更显利落舒适，适合运动和日常穿着。",
    "DANVOUY Womens T Shirt Casual Cotton Short": "柔软弹力棉质短袖 T 恤，适合休闲、办公、海边、校园和日常街头穿搭。",
    "Rose Printed Hoodie": "舒适连帽衫，采用醒目的玫瑰印花设计，适合日常休闲搭配。",
    "Basic Slim Fit Chinos Trousers": "基础修身卡其裤，版型利落，适合日常、通勤和休闲场合。",
    "Carpenter Jeans": "工装风牛仔裤，兼顾实用细节和休闲造型。",
    "Black Colored Sweatpants With Elastic Hems": "黑色运动裤配松紧裤脚，穿着舒适，适合休闲和运动场景。",
    "Oversize Faux Leather Biker Jacket": "宽松仿皮机车夹克，风格鲜明，适合打造街头休闲造型。",
    "Oversized Denim Jacket": "宽松牛仔夹克，易于叠穿，适合日常休闲搭配。",
    "Black Hoodie With Contrast Graphic": "黑色连帽衫配撞色图案，舒适实穿并带有鲜明视觉效果。",
    "Lightweight Zipped Bomber Jacket": "轻薄拉链飞行夹克，方便叠穿，适合多季节日常穿着。",
    "Hot Stuff Hoodie": "休闲连帽衫，柔软舒适，适合日常穿搭。",
    "Naruto Itachi Print T-shirt": "火影鼬印花 T 恤，适合动漫爱好者的休闲造型。",
    "Basic High-Neck Puff Jacket": "基础高领蓬松夹克，保暖舒适，适合凉爽天气。",
    "Orange Starter Logo T-shirt": "橙色 Starter 标志 T 恤，色彩醒目，适合休闲搭配。",
    "Tupac California Love T-Shirt": "Tupac California Love 图案 T 恤，适合音乐与街头风格爱好者。",
    "Cropped Satin Bomber Jacket": "短款缎面飞行夹克，质感顺滑，适合打造轻盈时尚造型。",
    "NMD_R1 Shoes": "NMD_R1 运动鞋采用现代轮廓和舒适脚感，适合日常出行。",
    "NMD_R1 SHOES": "NMD_R1 运动鞋采用现代轮廓和舒适脚感，适合日常出行。",
    "SL ANDRIDGE SHOES": "SL ANDRIDGE 运动鞋设计醒目，兼顾复古风格与日常舒适。",
    "OVERSIZE SHADOW TREFOIL TEE": "宽松 Shadow Trefoil T 恤，版型舒适，带有经典运动风格。",
    "HARDEN VOL. 4 SHOES": "Harden Vol. 4 篮球鞋提供支撑与缓震，适合球场和日常运动。",
    "TREFOIL TEE": "Trefoil T 恤采用经典标志设计，适合休闲运动穿搭。",
    "iPhone 9": "一款 Apple 手机，设计和体验与传统认知中的 Apple 产品有所不同。",
    "iPhone X": "无 SIM 锁版本，配备 6.5 英寸 Super Retina HD OLED 显示屏和 A12 仿生芯片。",
    "Samsung Universe 9": "三星新款机型，定位超越 Galaxy 系列，带来更大的想象空间。",
    "OPPOF19": "OPPO F19 于 2021 年 4 月正式发布，适合日常移动使用。",
    "Huawei P30": "华为 P30 Pro 新版在德国发布后进入英国市场，延续经典影像和旗舰体验。",
    "MacBook Pro": "MacBook Pro 提供强劲性能与精致设计，适合学习、办公和创作使用。",
    "Samsung Galaxy Book": "Samsung Galaxy Book S 搭载 Intel Lakefield 芯片和 8GB 内存，轻薄便携。",
    "Microsoft Surface Laptop 4": "兼具风格与速度，配备高清视频通话支持、Studio Mics 和灵敏触控屏。",
    "Infinix INBOOK": "Infinix INBOOK X1 配备第 10 代 Core i3、8GB 内存、256GB 存储和一年保修。",
    "HP Pavilion 15-DK1056WM": "HP Pavilion 游戏本搭载第 10 代 Core i5、8GB 内存、256GB SSD 和 GTX 1650 显卡。",
    "perfume Oil": "高折扣香氛精油，灵感来自 Giorgio Armani Acqua Di Gio 的浓缩香调。",
    "Brown Perfume": "Royal Mirage Sport 棕色香水，男女皆宜，容量 120ml。",
    "Fog Scent Xpressio Perfume": "Fog Scent Xpressio 男士香水，清爽持久，容量 100ml。",
    "Non-Alcoholic Concentrated Perfume Oil": "Al Munakh 无酒精浓缩香氛油，6ml 小瓶装，灵感来自 Climate 香调。",
    "Eau De Perfume Spray": "来自阿联酋、沙特和也门的 Al-Rehab 高品质香水喷雾。",
    "Hyaluronic Acid Serum": "L'Oréal Paris 玻尿酸精华，含 1.5% 玻尿酸，帮助肌肤丰盈补水。",
    "Tree Oil 30ml": "茶树精油含有多种活性化合物，适合日常护理使用。",
    "Oil Free Moisturizer 100ml": "Dermive 无油保湿乳含神经酰胺、玻尿酸和防晒成分，适合清爽保湿。",
    "Skin Beauty Serum.": "胶原蛋白玻尿酸亮肤精华，净含量 15ml，适合日常护肤。",
    "Freckle Treatment Cream- 15gm": "Fair & Clear 祛斑霜有助于淡化雀斑、黑斑和色素沉着，不含汞。",
    "Leather Straps Wristwatch": "运动风皮表带腕表，带针扣表扣，防水深度 3Bar。",
    "Waterproof Leather Brand Watch": "防水品牌腕表，采用环保 IPS 青铜电镀表冠和 12 小时显示系统。",
    "Royal Blue Premium Watch": "男士银色链带皇家蓝高级腕表，经典模拟显示。",
    "Leather Strap Skeleton Watch": "男士皮表带镂空机械腕表，设计时尚新颖。",
    "Stainless Steel Wrist Watch": "男士不锈钢腕表，豪华优雅并配有包装盒。"
  },
  es: {
    "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops": "La mochila ideal para el uso diario y paseos por el bosque. Guarda tu portátil de hasta 15 pulgadas en el compartimento acolchado.",
    "Mens Casual Premium Slim Fit T-Shirts": "Diseño ajustado con manga raglán en contraste y tapeta henley de tres botones. Tejido ligero, suave, transpirable y cómodo.",
    "Mens Cotton Jacket": "Chaqueta práctica para primavera, otoño e invierno, adecuada para trabajo, senderismo, camping, escalada, ciclismo, viajes y actividades al aire libre.",
    "Mens Casual Slim Fit": "El color puede variar ligeramente entre la pantalla y el producto real. Consulta la información de tallas detallada antes de comprar.",
    "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet": "De la colección Legends, Naga se inspira en el dragón mítico que protege la perla del océano. Úsala hacia dentro para amor y abundancia, o hacia fuera para protección.",
    "Solid Gold Petite Micropave": "Satisfacción garantizada. Puedes devolver o cambiar cualquier pedido durante los 30 días posteriores a la compra.",
    "White Gold Plated Princess": "Anillo clásico de compromiso estilo princesa, ideal para compromiso, boda, aniversario o San Valentín.",
    "Pierced Owl Rose Gold Plated Stainless Steel Double": "Pendientes de túnel doble con baño de oro rosa, fabricados en acero inoxidable 316L.",
    "WD 2TB Elements Portable External Hard Drive - USB 3.0": "Compatible con USB 3.0 y USB 2.0, ofrece transferencias rápidas, mejora el rendimiento del PC y añade gran capacidad.",
    "SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s": "Actualización sencilla para acelerar el arranque, apagado, carga de aplicaciones y respuesta del sistema.",
    "Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor": "Monitor gaming curvo super ultra ancho de 49 pulgadas con tecnología Quantum Dot, HDR y frecuencia de 144Hz.",
    "Silicon Power 256GB SSD 3D NAND A55 SLC Cache Performance Boost SATA III 2.5": "SSD con memoria 3D NAND para transferencias rápidas, arranque más veloz y mejor rendimiento general, con soporte TRIM, RAID y ECC.",
    "WD 4TB Gaming Drive Works with Playstation 4 Portable External Hard Drive": "Amplía tu experiencia en PS4 con una unidad portátil de gran capacidad, configuración rápida y diseño elegante.",
    "Acer SB220Q bi 21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin": "Monitor IPS Full HD ultrafino de 21.5 pulgadas con Radeon FreeSync, 75Hz y diseño sin marco.",
    "BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coats": "Chaqueta de snowboard 3 en 1 con forro cálido desmontable, capucha ajustable, protección contra viento y agua, y bolsillos seguros.",
    "Lock and Love Women's Removable Hooded Faux Leather Jacket": "Chaqueta de cuero sintético con capucha desmontable, bolsillos frontales y detalles de botones en la cintura.",
    "Rain Jacket Women Windbreaker Striped Climbing Raincoats": "Impermeable ligero para viaje o uso casual, con capucha, cintura ajustable, cierre de botones y cremallera, y bolsillos laterales.",
    "MBJ Women's Solid Short Sleeve Boat Neck V": "Top ligero y elástico con cuello barco, mangas cortas y costuras reforzadas para mayor comodidad.",
    "Opna Women's Short Sleeve Moisture": "Camiseta ligera y transpirable con tejido que aleja la humedad, cuello en V y silueta femenina cómoda.",
    "DANVOUY Womens T Shirt Casual Cotton Short": "Camiseta de algodón suave y elástica, ideal para uso casual, oficina, playa, escuela, casa o calle.",
    "Rose Printed Hoodie": "Sudadera cómoda con capucha y estampado de rosas, perfecta para looks casuales diarios.",
    "Basic Slim Fit Chinos Trousers": "Pantalones chinos básicos de corte ajustado, adecuados para uso diario, trabajo y ocasiones casuales.",
    "Carpenter Jeans": "Vaqueros estilo carpintero con detalles prácticos y un look casual resistente.",
    "Black Colored Sweatpants With Elastic Hems": "Pantalones deportivos negros con bajos elásticos, cómodos para descanso, deporte y uso diario.",
    "Oversize Faux Leather Biker Jacket": "Chaqueta biker oversize de cuero sintético con estilo marcado para looks urbanos.",
    "Oversized Denim Jacket": "Chaqueta vaquera oversize fácil de combinar y perfecta para vestir por capas.",
    "Black Hoodie With Contrast Graphic": "Sudadera negra con capucha y gráfico en contraste, cómoda y visualmente llamativa.",
    "Lightweight Zipped Bomber Jacket": "Bomber ligera con cremallera, fácil de combinar y adecuada para varias temporadas.",
    "Hot Stuff Hoodie": "Sudadera con capucha suave y cómoda para outfits casuales.",
    "Naruto Itachi Print T-shirt": "Camiseta con estampado de Naruto Itachi para fans del anime y looks informales.",
    "Basic High-Neck Puff Jacket": "Chaqueta acolchada básica de cuello alto, cálida y cómoda para días frescos.",
    "Orange Starter Logo T-shirt": "Camiseta naranja con logotipo Starter, llamativa y fácil de llevar.",
    "Tupac California Love T-Shirt": "Camiseta Tupac California Love para fans de la música y del estilo urbano.",
    "Cropped Satin Bomber Jacket": "Bomber corta de satén con textura suave y estilo ligero.",
    "NMD_R1 Shoes": "Zapatillas NMD_R1 con silueta moderna y comodidad para el día a día.",
    "NMD_R1 SHOES": "Zapatillas NMD_R1 con silueta moderna y comodidad para el día a día.",
    "SL ANDRIDGE SHOES": "Zapatillas SL ANDRIDGE con diseño llamativo, estilo retro y comodidad diaria.",
    "OVERSIZE SHADOW TREFOIL TEE": "Camiseta oversize Shadow Trefoil con ajuste cómodo y estilo deportivo clásico.",
    "HARDEN VOL. 4 SHOES": "Zapatillas Harden Vol. 4 con soporte y amortiguación para la cancha y el uso deportivo.",
    "TREFOIL TEE": "Camiseta Trefoil con logotipo clásico para looks casuales y deportivos.",
    "iPhone 9": "Un teléfono Apple que ofrece una experiencia distinta a la imagen tradicional de Apple.",
    "iPhone X": "Modelo libre de SIM con pantalla Super Retina HD OLED de 6.5 pulgadas y chip A12 Bionic.",
    "Samsung Universe 9": "Nueva variante de Samsung que va más allá de Galaxy hacia la línea Universe.",
    "OPPOF19": "OPPO F19 fue anunciado oficialmente en abril de 2021 para el uso móvil diario.",
    "Huawei P30": "La nueva edición del Huawei P30 Pro se presentó en Alemania y llegó al mercado del Reino Unido.",
    "MacBook Pro": "MacBook Pro combina alto rendimiento y diseño cuidado para estudiar, trabajar y crear contenido.",
    "Samsung Galaxy Book": "Samsung Galaxy Book S es un portátil con chip Intel Lakefield y 8GB de RAM.",
    "Microsoft Surface Laptop 4": "Estilo y velocidad con llamadas HD respaldadas por Studio Mics y una pantalla táctil vibrante.",
    "Infinix INBOOK": "Infinix INBOOK X1 incluye Core i3 de 10ª generación, 8GB de RAM, 256GB de almacenamiento y un año de garantía.",
    "HP Pavilion 15-DK1056WM": "Portátil gaming HP Pavilion con Core i5 de 10ª generación, 8GB de RAM, SSD de 256GB y GTX 1650.",
    "perfume Oil": "Aceite perfumado concentrado con descuento, inspirado en Acqua Di Gio de Giorgio Armani.",
    "Brown Perfume": "Perfume Royal Mirage Sport Brown para hombres y mujeres, presentación de 120ml.",
    "Fog Scent Xpressio Perfume": "Perfume Fog Scent Xpressio de 100ml para hombre, fresco y duradero.",
    "Non-Alcoholic Concentrated Perfume Oil": "Aceite perfumado concentrado sin alcohol Al Munakh de 6ml, inspirado en Climate.",
    "Eau De Perfume Spray": "Spray de perfume Al-Rehab de alta calidad procedente de EAU, Arabia Saudí y Yemen.",
    "Hyaluronic Acid Serum": "Sérum de ácido hialurónico de L'Oréal Paris con 1.5% de ácido hialurónico para hidratar y rellenar.",
    "Tree Oil 30ml": "Aceite de árbol de té con compuestos activos adecuados para el cuidado diario.",
    "Oil Free Moisturizer 100ml": "Hidratante sin aceite Dermive con ceramidas, ácido hialurónico y protección solar.",
    "Skin Beauty Serum.": "Sérum facial con colágeno y ácido hialurónico, contenido neto 15ml.",
    "Freckle Treatment Cream- 15gm": "Crema Fair & Clear para ayudar a atenuar pecas, manchas oscuras y pigmentación, sin mercurio.",
    "Leather Straps Wristwatch": "Reloj deportivo con correa de cuero, hebilla y resistencia al agua de 3Bar.",
    "Waterproof Leather Brand Watch": "Reloj impermeable con corona de chapado IPS bronce ecológico y sistema de 12 horas.",
    "Royal Blue Premium Watch": "Reloj analógico premium azul real con cadena plateada para hombre.",
    "Leather Strap Skeleton Watch": "Reloj esqueleto para hombre con correa de cuero y diseño moderno.",
    "Stainless Steel Wrist Watch": "Reloj de acero inoxidable para hombre, elegante, lujoso y presentado en caja."
  },
  fr: {
    "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops": "Le sac idéal pour un usage quotidien et les promenades en forêt. Rangez votre ordinateur jusqu'à 15 pouces dans la poche rembourrée.",
    "Mens Casual Premium Slim Fit T-Shirts": "Coupe ajustée avec manches raglan contrastées et patte henley à trois boutons. Tissu léger, doux, respirant et confortable.",
    "Mens Cotton Jacket": "Veste pratique pour le printemps, l'automne et l'hiver, adaptée au travail, à la randonnée, au camping, à l'escalade, au vélo et aux voyages.",
    "Mens Casual Slim Fit": "La couleur peut légèrement différer entre l'écran et le produit réel. Consultez les informations de taille détaillées avant l'achat.",
    "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet": "Issue de la collection Legends, Naga s'inspire du dragon mythique qui protège la perle de l'océan. Portez-la vers l'intérieur pour l'amour et l'abondance, ou vers l'extérieur pour la protection.",
    "Solid Gold Petite Micropave": "Satisfaction garantie. Toute commande peut être retournée ou échangée dans les 30 jours suivant l'achat.",
    "White Gold Plated Princess": "Bague de promesse classique style princesse, idéale pour fiançailles, mariage, anniversaire ou Saint-Valentin.",
    "Pierced Owl Rose Gold Plated Stainless Steel Double": "Boucles tunnel doubles plaquées or rose, fabriquées en acier inoxydable 316L.",
    "WD 2TB Elements Portable External Hard Drive - USB 3.0": "Compatible USB 3.0 et USB 2.0, ce disque offre des transferts rapides, améliore les performances du PC et ajoute une grande capacité.",
    "SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s": "Mise à niveau simple pour accélérer le démarrage, l'arrêt, le chargement des applications et la réactivité du système.",
    "Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor": "Écran gaming incurvé super ultra large de 49 pouces avec technologie Quantum Dot, HDR et fréquence de 144Hz.",
    "Silicon Power 256GB SSD 3D NAND A55 SLC Cache Performance Boost SATA III 2.5": "SSD avec mémoire 3D NAND pour des transferts rapides, un démarrage plus vif et de meilleures performances, avec prise en charge TRIM, RAID et ECC.",
    "WD 4TB Gaming Drive Works with Playstation 4 Portable External Hard Drive": "Étendez votre expérience PS4 avec un disque portable haute capacité, une installation simple et un design élégant.",
    "Acer SB220Q bi 21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin": "Écran IPS Full HD ultra-fin de 21,5 pouces avec Radeon FreeSync, 75Hz et design sans cadre.",
    "BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coats": "Veste de snowboard 3 en 1 avec doublure chaude amovible, capuche réglable, protection vent et pluie, et poches zippées.",
    "Lock and Love Women's Removable Hooded Faux Leather Jacket": "Veste en simili cuir avec capuche amovible, poches avant et détails boutonnés à la taille.",
    "Rain Jacket Women Windbreaker Striped Climbing Raincoats": "Imperméable léger pour voyage ou tenue décontractée, avec capuche, taille ajustable, fermeture boutons et zip, et poches latérales.",
    "MBJ Women's Solid Short Sleeve Boat Neck V": "Haut léger et extensible à col bateau, manches courtes et coutures renforcées pour plus de confort.",
    "Opna Women's Short Sleeve Moisture": "T-shirt léger et respirant avec tissu anti-humidité, col en V et coupe féminine confortable.",
    "DANVOUY Womens T Shirt Casual Cotton Short": "T-shirt en coton doux et extensible, adapté au quotidien, bureau, plage, école, maison ou rue.",
    "Rose Printed Hoodie": "Sweat à capuche confortable avec imprimé roses, parfait pour les tenues décontractées.",
    "Basic Slim Fit Chinos Trousers": "Pantalon chino basique ajusté, adapté au quotidien, au travail et aux moments décontractés.",
    "Carpenter Jeans": "Jean style charpentier avec détails pratiques et allure casual robuste.",
    "Black Colored Sweatpants With Elastic Hems": "Pantalon de survêtement noir à ourlets élastiques, confortable pour détente, sport et quotidien.",
    "Oversize Faux Leather Biker Jacket": "Veste biker oversize en simili cuir au style affirmé pour des looks urbains.",
    "Oversized Denim Jacket": "Veste en jean oversize facile à associer et idéale pour les superpositions.",
    "Black Hoodie With Contrast Graphic": "Sweat noir à capuche avec motif contrasté, confortable et visuellement marqué.",
    "Lightweight Zipped Bomber Jacket": "Bomber léger zippé, facile à superposer et adapté à plusieurs saisons.",
    "Hot Stuff Hoodie": "Sweat à capuche doux et confortable pour tenues décontractées.",
    "Naruto Itachi Print T-shirt": "T-shirt imprimé Naruto Itachi pour fans d'anime et looks casual.",
    "Basic High-Neck Puff Jacket": "Doudoune basique à col montant, chaude et confortable pour temps frais.",
    "Orange Starter Logo T-shirt": "T-shirt orange avec logo Starter, lumineux et facile à porter.",
    "Tupac California Love T-Shirt": "T-shirt Tupac California Love pour amateurs de musique et de style urbain.",
    "Cropped Satin Bomber Jacket": "Bomber court en satin à texture douce et style léger.",
    "NMD_R1 Shoes": "Chaussures NMD_R1 à silhouette moderne et confort quotidien.",
    "NMD_R1 SHOES": "Chaussures NMD_R1 à silhouette moderne et confort quotidien.",
    "SL ANDRIDGE SHOES": "Chaussures SL ANDRIDGE au design expressif, style rétro et confort quotidien.",
    "OVERSIZE SHADOW TREFOIL TEE": "T-shirt oversize Shadow Trefoil à coupe confortable et style sportif classique.",
    "HARDEN VOL. 4 SHOES": "Chaussures Harden Vol. 4 avec maintien et amorti pour le terrain et le sport.",
    "TREFOIL TEE": "T-shirt Trefoil avec logo classique pour tenues casual et sportives.",
    "iPhone 9": "Un téléphone Apple qui propose une expérience différente de l'image traditionnelle d'Apple.",
    "iPhone X": "Modèle sans SIM avec écran Super Retina HD OLED de 6,5 pouces et puce A12 Bionic.",
    "Samsung Universe 9": "Nouvelle variante Samsung qui dépasse Galaxy pour rejoindre l'univers Universe.",
    "OPPOF19": "OPPO F19 a été annoncé officiellement en avril 2021 pour un usage mobile quotidien.",
    "Huawei P30": "La nouvelle édition du Huawei P30 Pro a été dévoilée en Allemagne avant d'arriver au Royaume-Uni.",
    "MacBook Pro": "Le MacBook Pro associe performances élevées et design soigné pour les études, le travail et la création.",
    "Samsung Galaxy Book": "Samsung Galaxy Book S est un ordinateur portable avec puce Intel Lakefield et 8GB de RAM.",
    "Microsoft Surface Laptop 4": "Style et vitesse avec appels vidéo HD, Studio Mics et écran tactile vibrant.",
    "Infinix INBOOK": "Infinix INBOOK X1 comprend un Core i3 10e génération, 8GB de RAM, 256GB de stockage et un an de garantie.",
    "HP Pavilion 15-DK1056WM": "PC portable gaming HP Pavilion avec Core i5 10e génération, 8GB de RAM, SSD 256GB et GTX 1650.",
    "perfume Oil": "Huile parfumée concentrée à prix réduit, inspirée d'Acqua Di Gio de Giorgio Armani.",
    "Brown Perfume": "Parfum Royal Mirage Sport Brown pour hommes et femmes, flacon de 120ml.",
    "Fog Scent Xpressio Perfume": "Parfum Fog Scent Xpressio 100ml pour homme, frais et longue tenue.",
    "Non-Alcoholic Concentrated Perfume Oil": "Huile parfumée concentrée sans alcool Al Munakh 6ml, inspirée de Climate.",
    "Eau De Perfume Spray": "Spray parfum Al-Rehab de haute qualité provenant des Émirats arabes unis, d'Arabie saoudite et du Yémen.",
    "Hyaluronic Acid Serum": "Sérum à l'acide hyaluronique L'Oréal Paris avec 1,5% d'acide hyaluronique pour hydrater et repulper.",
    "Tree Oil 30ml": "Huile d'arbre à thé contenant des composés actifs adaptés aux soins quotidiens.",
    "Oil Free Moisturizer 100ml": "Hydratant sans huile Dermive avec céramides, acide hyaluronique et protection solaire.",
    "Skin Beauty Serum.": "Sérum visage au collagène et à l'acide hyaluronique, contenu net 15ml.",
    "Freckle Treatment Cream- 15gm": "Crème Fair & Clear pour aider à atténuer taches de rousseur, taches sombres et pigmentation, sans mercure.",
    "Leather Straps Wristwatch": "Montre sport avec bracelet en cuir, boucle et résistance à l'eau 3Bar.",
    "Waterproof Leather Brand Watch": "Montre étanche avec couronne en plaquage bronze IPS écologique et affichage 12 heures.",
    "Royal Blue Premium Watch": "Montre analogique premium bleu royal avec chaîne argentée pour homme.",
    "Leather Strap Skeleton Watch": "Montre squelette pour homme avec bracelet en cuir et design moderne.",
    "Stainless Steel Wrist Watch": "Montre homme en acier inoxydable, élégante, luxueuse et livrée en coffret."
  }
};

function normalizeProductTitle(title) {
  return String(title || "").trim();
}

function normalizeProductDescription(description) {
  return String(description || "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function translateCategoryName(category) {
  const language = getCurrentLanguage();
  return categoryTranslations[language]?.[category] || category;
}

function translateProductTitle(title) {
  const language = getCurrentLanguage();
  const normalizedTitle = normalizeProductTitle(title);
  return productTitleTranslations[language]?.[normalizedTitle] || title;
}

function translateProductDescription(product) {
  const language = getCurrentLanguage();
  const normalizedTitle = normalizeProductTitle(product?.title);
  const fallbackDescription = normalizeProductDescription(product?.description);
  return productDescriptionTranslations[language]?.[normalizedTitle] || fallbackDescription || t("product.noDescription");
}

function refreshTranslatedProductText() {
  document.querySelectorAll("[data-product-title]").forEach((element) => {
    element.textContent = translateProductTitle(element.getAttribute("data-product-title"));
  });

  document.querySelectorAll("[data-product-description-title]").forEach((element) => {
    element.textContent = translateProductDescription({
      title: element.getAttribute("data-product-description-title"),
      description: element.getAttribute("data-product-description") || ""
    });
  });

  document.querySelectorAll("[data-category-name]").forEach((element) => {
    element.textContent = translateCategoryName(element.getAttribute("data-category-name"));
  });

  const productSectionTitle = document.querySelector(".products__section h2[data-selected-category]");
  if(productSectionTitle) {
    productSectionTitle.textContent = translateCategoryName(productSectionTitle.getAttribute("data-selected-category"));
  }
}

const translations = {
  en: {
    "nav.cashback": "get upto 25% cashback on first order",
    "nav.trackOrder": "Track Order",
    "search.placeholder": "Search our product",
    "search.button": "Search",
    "menu.shopCategories": "Shop Categories",
    "menu.home": "HOME",
    "menu.categories": "Categories",
    "menu.products": "Products",
    "menu.about": "About",
    "banner.smartWatches": "Smart Watches",
    "banner.phones": "Phones",
    "banner.laptops": "Laptops",
    "banner.offer": "Amazing and Exclusive offers",
    "section.categories": "Categories",
    "section.products": "Products",
    "footer.bio": "Discover selected products, exclusive deals, and a simple shopping experience for every customer.",
    "footer.home": "Home",
    "footer.products": "Products",
    "footer.categories": "Categories",
    "footer.search": "Search",
    "footer.about": "About",
    "footer.contact": "Contact us",
    "footer.followUs": "Follow us",
    "product.noResults": "No Results",
    "product.availability": "Availability",
    "product.manyInStock": "Many In Stock",
    "product.noDescription": "No description available",
    "cart.addToCart": "Add To Cart",
    "cart.added": "✓ Added to cart!",
    "cart.removed": "Item removed from cart",
    "cart.total": "Cart Total",
    "cart.orderNow": "Order Now",
    "toast.currencyChanged": "Currency changed",
    "toast.currencyFailed": "Failed to load currency rates."
  },
  zh: {
    "nav.cashback": "首单最高可享 25% 返现",
    "nav.trackOrder": "订单追踪",
    "search.placeholder": "搜索商品",
    "search.button": "搜索",
    "menu.shopCategories": "商品分类",
    "menu.home": "首页",
    "menu.categories": "分类",
    "menu.products": "商品",
    "menu.about": "关于我们",
    "banner.smartWatches": "智能手表",
    "banner.phones": "手机",
    "banner.laptops": "笔记本电脑",
    "banner.offer": "惊喜专属优惠",
    "section.categories": "分类",
    "section.products": "商品",
    "footer.bio": "发现精选商品、专属优惠，享受简单便捷的购物体验。",
    "footer.home": "首页",
    "footer.products": "商品",
    "footer.categories": "分类",
    "footer.search": "搜索",
    "footer.about": "关于我们",
    "footer.contact": "联系我们",
    "footer.followUs": "关注我们",
    "product.noResults": "没有结果",
    "product.availability": "库存",
    "product.manyInStock": "库存充足",
    "product.noDescription": "暂无商品描述",
    "cart.addToCart": "加入购物车",
    "cart.added": "✓ 已加入购物车！",
    "cart.removed": "商品已从购物车移除",
    "cart.total": "购物车总计",
    "cart.orderNow": "立即下单",
    "toast.currencyChanged": "货币已更改",
    "toast.currencyFailed": "无法加载汇率。"
  },
  es: {
    "nav.cashback": "obtén hasta un 25% de reembolso en tu primer pedido",
    "nav.trackOrder": "Seguir pedido",
    "search.placeholder": "Buscar productos",
    "search.button": "Buscar",
    "menu.shopCategories": "Comprar por categorías",
    "menu.home": "INICIO",
    "menu.categories": "Categorías",
    "menu.products": "Productos",
    "menu.about": "Acerca de",
    "banner.smartWatches": "Relojes inteligentes",
    "banner.phones": "Teléfonos",
    "banner.laptops": "Portátiles",
    "banner.offer": "Ofertas increíbles y exclusivas",
    "section.categories": "Categorías",
    "section.products": "Productos",
    "footer.bio": "Descubre productos seleccionados, ofertas exclusivas y una experiencia de compra sencilla para cada cliente.",
    "footer.home": "Inicio",
    "footer.products": "Productos",
    "footer.categories": "Categorías",
    "footer.search": "Buscar",
    "footer.about": "Acerca de",
    "footer.contact": "Contáctanos",
    "footer.followUs": "Síguenos",
    "product.noResults": "Sin resultados",
    "product.availability": "Disponibilidad",
    "product.manyInStock": "Muchas unidades disponibles",
    "product.noDescription": "No hay descripción disponible",
    "cart.addToCart": "Añadir al carrito",
    "cart.added": "✓ ¡Añadido al carrito!",
    "cart.removed": "Producto eliminado del carrito",
    "cart.total": "Total del carrito",
    "cart.orderNow": "Pedir ahora",
    "toast.currencyChanged": "Moneda cambiada",
    "toast.currencyFailed": "No se pudieron cargar los tipos de cambio."
  },
  fr: {
    "nav.cashback": "jusqu'à 25% de cashback sur la première commande",
    "nav.trackOrder": "Suivre la commande",
    "search.placeholder": "Rechercher un produit",
    "search.button": "Rechercher",
    "menu.shopCategories": "Acheter par catégories",
    "menu.home": "ACCUEIL",
    "menu.categories": "Catégories",
    "menu.products": "Produits",
    "menu.about": "À propos",
    "banner.smartWatches": "Montres connectées",
    "banner.phones": "Téléphones",
    "banner.laptops": "Ordinateurs portables",
    "banner.offer": "Offres incroyables et exclusives",
    "section.categories": "Catégories",
    "section.products": "Produits",
    "footer.bio": "Découvrez des produits sélectionnés, des offres exclusives et une expérience d'achat simple pour chaque client.",
    "footer.home": "Accueil",
    "footer.products": "Produits",
    "footer.categories": "Catégories",
    "footer.search": "Rechercher",
    "footer.about": "À propos",
    "footer.contact": "Nous contacter",
    "footer.followUs": "Suivez-nous",
    "product.noResults": "Aucun résultat",
    "product.availability": "Disponibilité",
    "product.manyInStock": "Beaucoup en stock",
    "product.noDescription": "Aucune description disponible",
    "cart.addToCart": "Ajouter au panier",
    "cart.added": "✓ Ajouté au panier !",
    "cart.removed": "Article retiré du panier",
    "cart.total": "Total du panier",
    "cart.orderNow": "Commander maintenant",
    "toast.currencyChanged": "Devise modifiée",
    "toast.currencyFailed": "Impossible de charger les taux de change."
  }
};

const supportedLanguages = ["en", "zh", "es", "fr"];
const languageNames = {
  en: "English",
  zh: "中文",
  es: "Español",
  fr: "Français"
};

function getCurrentLanguage() {
  const savedLanguage = localStorage.getItem("language");
  return supportedLanguages.includes(savedLanguage) ? savedLanguage : "en";
}

function t(key) {
  const language = getCurrentLanguage();
  return translations[language]?.[key] || translations.en[key] || key;
}

function applyLanguage(language = getCurrentLanguage()) {
  document.documentElement.lang = language;
  document.body.lang = language;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");
    element.textContent = t(key);
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    const key = element.getAttribute("data-i18n-placeholder");
    element.placeholder = t(key);
  });

  const currentLanguage = supportedLanguages.includes(language) ? language : "en";
  const languageContainer = document.querySelector("#language-toggle");
  const languageName = document.querySelector(".language__name");
  if (languageContainer) {
    languageContainer.setAttribute("aria-label", "Select language");
  }
  if (languageName) {
    languageName.textContent = languageNames[currentLanguage];
    languageName.setAttribute("data-language", currentLanguage);
  }

  refreshTranslatedProductText();
}

document.addEventListener("DOMContentLoaded", () => {
  const savedLanguage = getCurrentLanguage();
  applyLanguage(savedLanguage);

  const languageContainer = document.querySelector("#language-toggle");
  const languageOptions = document.querySelector(".language__options");
  const languageIcon = document.querySelector(".language__list__ico");

  function hideLanguageOptions() {
    languageOptions?.classList.remove("listed");
    languageContainer?.setAttribute("aria-expanded", "false");
    if (languageIcon) {
      languageIcon.className = "language__list__ico fa-solid fa-chevron-down mx-1";
    }
  }

  function showLanguageOptions() {
    languageOptions?.classList.add("listed");
    languageContainer?.setAttribute("aria-expanded", "true");
    if (languageIcon) {
      languageIcon.className = "language__list__ico fa-solid fa-chevron-up mx-1";
    }
  }

  languageContainer?.addEventListener("click", (event) => {
    event.stopPropagation();
    if (languageOptions?.classList.contains("listed")) {
      hideLanguageOptions();
    } else {
      showLanguageOptions();
    }
  });

  languageContainer?.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      languageContainer.click();
    }
    if (event.key === "Escape") {
      hideLanguageOptions();
    }
  });

  document.querySelectorAll(".language__option").forEach((option) => {
    option.addEventListener("click", (event) => {
      event.stopPropagation();
      const selectedLanguage = event.currentTarget.getAttribute("data-language");
      const nextLanguage = supportedLanguages.includes(selectedLanguage) ? selectedLanguage : "en";
      localStorage.setItem("language", nextLanguage);
      applyLanguage(nextLanguage);
      hideLanguageOptions();
      window.dispatchEvent(new CustomEvent("languagechange", { detail: { language: nextLanguage } }));
    });
  });

  document.addEventListener("click", hideLanguageOptions);
});

// ========== Toast 通知系统 ==========
function showToast(message, type = "info") {
    let toastContainer = document.querySelector(".toast-container");
    if (!toastContainer) {
        toastContainer = document.createElement("div");
        toastContainer.className = "toast-container";
        toastContainer.style.cssText = "position: fixed; bottom: 20px; right: 20px; z-index: 9999;";
        document.body.appendChild(toastContainer);
    }
    const toast = document.createElement("div");
    let bgColor = type === "success" ? "#28a745" : type === "error" ? "#dc3545" : "#17a2b8";
    toast.style.cssText = `background: ${bgColor}; color: white; padding: 12px 20px; margin-top: 10px; border-radius: 8px; font-size: 14px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);`;
    toast.textContent = message;
    toastContainer.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}
// ========== Toast 系统结束 ==========// loading page
window.addEventListener("load", () => {
document.querySelector("main").style.display = "block";
document.querySelector(".loader").style.display = "none";
});

// scroll to top
let scroll__top__btn = document.querySelector(".scroll__top__btn");
scroll__top__btn.setAttribute("tabindex", "-1");
window.addEventListener("scroll", () => {
if(scrollY >= 500) {
  scroll__top__btn.classList.add("displayed");
  scroll__top__btn.setAttribute("tabindex", "0");
} else{
  scroll__top__btn.classList.remove("displayed");
  scroll__top__btn.setAttribute("tabindex", "-1");
}
});

// Currency convert
const currency__container = document.querySelector(".currency__container");
const currency__name = document.querySelector(".currency__name");
const currency__logo = document.querySelector(".currency__logo");
const currency__list__ico = document.querySelector(".currency__container i");

const currencies__data = [];
const fallbackCurrencies = [
  { name: "USD", rate: 1 },
  { name: "CNY", rate: 7.2 },
  { name: "EUR", rate: 0.92 },
  { name: "GBP", rate: 0.79 }
];

function currency_logo_src(currencyName) {
  return `https://flagcdn.com/w40/${currencyName.slice(0, currencyName.length - 1).toLowerCase()}.png`;
}

if(localStorage.getItem("currency")) {
let the__currency__data = JSON.parse(localStorage.getItem("currency"));
currency__name.setAttribute("the-rate", the__currency__data.rate);
currency__name.setAttribute("the-currency", the__currency__data.name);
currency__name.textContent = the__currency__data.name;

currency__logo.src = currency_logo_src(the__currency__data.name);
currency__logo.alt = the__currency__data.name;
} else{
let usd = {
  name: "USD",
  rate: 1.0
}

localStorage.setItem("currency", JSON.stringify(usd));
}

function normalize_currency_data(currencyData) {
  return currencyData.map((ele) => ({
    name: ele.name,
    rate: ele.rate,
    logo__src: ele.logo__src || currency_logo_src(ele.name)
  }));
}

function get_api_currencies(response) {
  const rates = response?.rates;
  if (!rates || typeof rates !== "object") {
    return [];
  }

  return ["USD", "CNY", "EUR", "GBP"].reduce((result, currencyName) => {
    const rate = Number(rates[currencyName]);
    if (Number.isFinite(rate) && rate > 0) {
      result.push({
        name: currencyName,
        rate,
        logo__src: currency_logo_src(currencyName)
      });
    }

    return result;
  }, []);
}

function render_currency_options(currencyData) {
  if (!currency__container) {
    return;
  }

  const safeCurrencyData = normalize_currency_data(currencyData);
  currencies__data.length = 0;
  currencies__data.push(...safeCurrencyData);

  const oldOptions = currency__container.querySelector(".currency__options");
  if (oldOptions) {
    oldOptions.remove();
  }

  let currency__options = document.createElement("ul");
  currency__options.classList.add("currency__options", "list-unstyled", "p-1");
  currency__container.append(currency__options);

  safeCurrencyData.forEach((ele) => {
    let currency = document.createElement("li"),
        currency__option__logo = document.createElement("img"),
        currency__option__name = document.createElement("span");

    currency__option__logo.src = ele.logo__src;
    currency__option__logo.alt = ele.name;

    currency__option__name.textContent = ele.name;
    currency__option__name.setAttribute("the-currency", ele.name);
    currency__option__name.setAttribute("the-rate", ele.rate);

    currency.append(currency__option__logo, currency__option__name);
    currency__options.append(currency);

    document.querySelector(".cart__items__preview").classList.remove("listed__cart");
  });

  if (!currency__container.dataset.currencyListenerAttached) {
    currency__container.addEventListener("click", () => {
      if(!currency__options.classList.contains("listed")) {
          currency__options.classList.add("listed");
          currency__list__ico.className = "fa-solid fa-chevron-up mx-1";
      } else{
          currency__options.classList.remove("listed");
          currency__list__ico.className = "fa-solid fa-chevron-down mx-1";
      }
      showToast(t("toast.currencyChanged"), "info");
    });
    currency__container.dataset.currencyListenerAttached = "true";
  }

  let currencies__items = document.querySelectorAll(".currency__options li");
  currencies__items.forEach(ele => {
    ele.addEventListener("click", (e) => {
        currency__options.classList.add("listed");
        currency__logo.src = e.currentTarget.children[0].getAttribute("src");
        currency__logo.alt = e.currentTarget.children[1].textContent;

        currency__name.textContent = e.currentTarget.children[1].textContent;
        currency__name.setAttribute("the-currency", e.currentTarget.children[1].textContent);
        currency__name.setAttribute("the-rate", e.currentTarget.children[1].getAttribute("the-rate"));

        let currency__obj__in__localStorage = {
            name: currency__name.getAttribute("the-currency"),
            rate: currency__name.getAttribute("the-rate")
        };

        localStorage.setItem("currency",  JSON.stringify(currency__obj__in__localStorage));

        // change product currency
        let product__prices = document.querySelectorAll(".product__price");
        let current__currency = JSON.parse(localStorage.getItem("currency"));

        product__prices.forEach(ele => {
            let price = +ele.getAttribute("price-USD");
            ele.textContent = (price * current__currency.rate).toFixed(2) + " " + current__currency.name;
        });

    });
  });
}

fetch_data('/api/currency')
.then(res => {
  const apiCurrencies = get_api_currencies(res);

  if (apiCurrencies.length === 0) {
    throw new Error("Invalid currency API data");
  }

  render_currency_options(apiCurrencies);
})
.catch(error => {
    console.error("Currency API error:", error);
    showToast(t("toast.currencyFailed"), "error");
    render_currency_options(fallbackCurrencies);
});


window.addEventListener("load", () => {
let currency__options__items = document.querySelectorAll(".currency__options li");

  currency__options__items.forEach(ele => {
    ele.addEventListener("click", () => {
      let products__price = document.querySelectorAll(".product__price"),
          theCurrency = JSON.parse(localStorage.getItem("currency"));

        products__price.forEach(ele => {
            let the_price_USD = parseInt(ele.getAttribute("price-USD"));
            let the_new_price = (the_price_USD * +theCurrency.rate).toFixed(2);

            ele.textContent = the_new_price + " " + theCurrency.name;
      });
    });
  })
});

// set categories
const categories__btn = document.querySelector(".categories__btn");
const categories = new Set();
const all_products = new Set();
const categories__logos = [
{
  name: "smartphones",
  src: "images/samrtphones.jpg"
},
{
  name: "electronics",
  src: "images/electronics.jpg"
},
{
  name: "laptops",
  src: "images/laptops.jpg"
},
{
  name: "watches",
  src: "images/watches.webp"
},
{
  name: "shoes",
  src: "images/shoes.png"
},
{
  name: "fragrances",
  src: "images/Fragrances.jpg"
},
{
  name: "skincare",
  src: "images/skincare.jpg"
},,
{
  name: "men's products",
  src: "images/Men's products.jpg"
},
{
  name: "women's products",
  src: "images/Women's products.jpg"
},
{
  name: "jewelery",
  src: "images/jewelry.webp"
}
];

fetch_data("all_products.json").then(res => {
  res.forEach((ele, i) => {set_products_obj(ele, i)});

  let categories__options = document.createElement("ul");

  categories__options.className = "categories__options p-2 list-unstyled";
  document.querySelector(".categories__container").append(categories__options);

  categories.forEach((ele) => {
    let category = document.createElement("li");
    let category__logo = document.createElement("img");

    category.className = "category p-2";
    category.setAttribute("category", ele);
    category__logo.classList.add("mx-2")

    categories__logos.forEach(el => {
        if(el.name == ele) {
          category__logo.src = el.src;
          category__logo.alt = category_image_alt(el.name);
        }
    });

    category.prepend(category__logo);
    category.append(category__link(ele));

    categories__options.append(category);
  });


  function set__categories__logos(category, data) {
    data.forEach(el => {
        if(el.name == category) {
            let category__logo = document.createElement("img");
            category__logo.src = el.src;

            return category__logo;
        }
    })
  }


  function category__link(txt) {
    let category__link = document.createElement("a");
    category__link.classList.add("text-decoration-none");
    category__link.href = `#categories__section`;
    category__link.text = translateCategoryName(txt);
    category__link.setAttribute("data-category-name", txt);

    return category__link;
  }

  categories__btn.onclick = function() {
    if(!categories__options.classList.contains("listed")) {
        categories__options.classList.add("listed");
    } else {
        categories__options.classList.remove("listed");
    }
  }

  let categories__items = document.querySelectorAll(".category");

  categories__items.forEach(ele => {
    ele.onclick = function(e) {
        categories__options.classList.remove("listed");
    }
  });

});

// product preview
function display_product_preview() {
  let products = document.querySelectorAll(".product");

  products.forEach(ele => {
    ele.addEventListener("click", () => {
        // display the container
        document.body.classList.add("overlay");
        // render product
        render_preview(ele);
    });
  });
}

// cart items
const cart__items = new Set();
let saved__cart__items = localStorage.getItem("cart-items");
let cart__ico = document.querySelector(".cart__ico");

if(saved__cart__items) {
  JSON.parse(saved__cart__items).forEach(ele => {cart__items.add(ele)});
}

cart_items_num();

cart__ico.onclick = function() {
  let cart__items__preview = document.querySelector(".cart__items__preview"),
      localStorage__data = JSON.parse(localStorage.getItem("cart-items"));

  if(localStorage__data && localStorage__data.length >= 1) {
    display_cart_preview();
  } else{
    cart__items__preview.classList.remove("listed__cart");
  }
}


// ==== Global function ====

function fetch_data(url) {
const req = fetch(url).then(res => res.json());
return req;
}

function set_products_obj(element, index) {
all_products.add(element);
element.id = index;

if(["Pants","Jackets","Hoodies","Jackets","Hoodies","T-shirt","Jackets","T-shirt","Jackets", "T-shirts"].includes(element.category)) {
  element.category = "men's products";
}

categories.add(element.category);
}

function change_currency() {
  let currencies__items = document.querySelectorAll(".currency__options li");

  currencies__items.forEach(ele => {
      ele.addEventListener("click", () => {
          let product__prices = document.querySelectorAll(".product__price");
          let current__currency = JSON.parse(localStorage.getItem("currency"));

          product__prices.forEach(ele => {
              let price = +ele.getAttribute("price-USD");
              ele.textContent = (price * current__currency.rate).toFixed(2) + " " + current__currency.name;
          });
      });
  });

}

function render_preview(element) {
  let product__preview = document.querySelector(".product__preview");

  display_loading_spinner(product__preview);

  fetch_data("all_products.json").then(res => {
    let product__id = +element.getAttribute("product-id"),
        product__obj = [...all_products][product__id],
        current__currency = JSON.parse(localStorage.getItem("currency")),
        current__price = (product__obj.price * current__currency.rate).toFixed(2);

    product__preview.innerHTML = `
    <i class="product__details__close fa-solid fa-xmark p-2"></i>

    <div class="product__images">
        <div class="main__image__container p-3"></div>

        <div class="product__images__pagination mt-3">
            <div class="images__pagination__container px-2"></div>
            <div class="images__pagination__control next d-flex justify-content-center align-items-center">
                <i class="fa-solid fa-angle-right"></i>
            </div>
            <div class="images__pagination__control previous d-flex justify-content-center align-items-center">
                <i class="fa-solid fa-angle-left"></i>
            </div>
        </div>
    </div>

    <div class="product__details p-2">
        <h2 class="py-1"></h2><hr class="m-0">
        <div class="product__description mb-4 mt-3"></div>

        <div>
            <div class="product__details__price">
                <span class="the__current__price">
                    <span class="currency__value"></span>
                    <span class="currency__name"></span>
                </span>
                <del class="the__old__price mx-2"></del>
            </div>

            <p class="availability mb-4">
                <span class="availability__label"></span> : <span class="availability__value"></span>
            </p>

        </div>

        <div class="product__sale mt-5">
        <button class="add__to__cart py-2 px-3">
            <i class="fa-solid fa-cart-shopping mx-2  text-decoration-none"></i>
            <span class="add__to__cart__text"></span>
        </button>

      </div>

    </div>`;

    let product__title = product__preview.querySelector(".product__details h2"),
        product__description = product__preview.querySelector(".product__description"),
        currency__value = product__preview.querySelector(".currency__value"),
        currency__name__preview = product__preview.querySelector(".currency__name"),
        availability__label = product__preview.querySelector(".availability__label"),
        availability__value = product__preview.querySelector(".availability__value"),
        add__to__cart__btn = product__preview.querySelector(".add__to__cart"),
        add__to__cart__text = product__preview.querySelector(".add__to__cart__text");

    product__title.textContent = translateProductTitle(product__obj.title);
    product__title.setAttribute("data-product-title", product__obj.title);
    product__description.textContent = translateProductDescription(product__obj);
    product__description.setAttribute("data-product-description-title", product__obj.title);
    product__description.setAttribute("data-product-description", product__obj.description || "");
    currency__value.setAttribute("product-price", current__price);
    currency__value.textContent = current__price;
    currency__name__preview.textContent = current__currency.name;
    availability__label.textContent = t("product.availability");
    availability__value.textContent = product_stock();
    add__to__cart__text.textContent = t("cart.addToCart");
    add__to__cart__btn.setAttribute("product-id", product__obj.id);

    // elements functions
      // main image
      const main__image__container = document.querySelector(".main__image__container");
      let main__image = document.createElement("img");

      main__image.className = 'main__image';
      main__image.alt = `${product__obj.title} - main product photo`;
      set_image_fallback(main__image, product__obj);
      main__image.src = img_src(product__obj);
      main__image__container.append(main__image);
      // image zoom
      main__image__container.onmousemove = function(e) {
          let x = (e.clientX - main__image__container.offsetWidth) / main__image__container.offsetWidth * 100,
              y = (e.clientY - main__image__container.offsetHeight) / main__image__container.offsetHeight * 100;

          main__image.style.transform = `translate(${-x}%, ${-y}%) scale(2.4)`;
      }

      main__image__container.ontouchmove = function(e){
          let x = (e.clientX - main__image__container.offsetWidth) / main__image__container.offsetWidth * 100,
              y = (e.clientY - main__image__container.offsetHeight) / main__image__container.offsetHeight * 100;

          main__image.style.transform = `translate(${-x}%, ${-y}%) scale(2)`;
      }

      main__image__container.addEventListener("mouseleave", (e) => {
          main__image.style.transform = `translate(0, 0) scale(1)`;
      });

      // product images pagination
      const images__pagination__container = document.querySelector(".images__pagination__container");
      set_images_pagination();
      pagination_control();
      pagination_images_select();

      // close preview container
      let product__details__close = document.querySelector(".product__details__close");
      product__details__close.onclick = function() {document.body.classList.remove("overlay");}
      product__preview.classList.remove("loading");

      // images slider
      const images__pagination__container__images = document.querySelectorAll(".images__pagination__container img");
      const next = document.querySelector(".next");
      const previous = document.querySelector(".previous");

      if(next && previous) {

          next.onclick = function() {
            let active__image = document.querySelector(".active__image"),
                active__image__id = +active__image.getAttribute("image-id");

              images__pagination__container__images.forEach(ele => {
                images__pagination__container.scrollLeft += 20;

                if(+ele.getAttribute("image-id") == (active__image__id + 1)) {
                  images__pagination__container__images.forEach(ele => {ele.classList.remove("active__image")});
                  ele.classList.add("active__image");
                  main__image.src = ele.src;
                  main__image.alt = ele.alt;
                }
              });
          }

          previous.onclick = function() {
            let active__image = document.querySelector(".active__image"),
              active__image__id = +active__image.getAttribute("image-id");

            images__pagination__container__images.forEach(ele => {
              images__pagination__container.scrollLeft -= 20;

              if(+ele.getAttribute("image-id") == (active__image__id - 1)) {
                images__pagination__container__images.forEach(ele => {ele.classList.remove("active__image")});
                ele.classList.add("active__image");
                main__image.src = ele.src;
                main__image.alt = ele.alt;
              }
            });
          }

      }

      // old price
      let the__old__price = document.querySelector(".the__old__price");
      the__old__price.textContent = product_price_before_discount();

      // add to cart
      let add__to__cart = document.querySelector(".add__to__cart");

      add__to__cart.onclick = function(e) {
        let item = +e.currentTarget.getAttribute("product-id");

        if(localStorage.getItem("cart-items")) {
          let update__items = new Set( JSON.parse(localStorage.getItem("cart-items")));
          update__items.add(item);
          localStorage.setItem("cart-items", JSON.stringify([...update__items]));
        } else{
          cart__items.add(item);
          localStorage.setItem("cart-items", JSON.stringify([...cart__items]));
        }

        cart_items_num();
        showToast(t("cart.added"), "success");
      }


    // functions
    function product_price_before_discount(){
        if(product__obj.discountPercentage) {
            let currency__value = +document.querySelector(".currency__value").textContent;
            let old__price = (currency__value / ((100 - product__obj.discountPercentage))) * 100;

            return old__price.toFixed(2)

        } else if(product__obj.old_price){
          return product__obj.old_price

        } else{
          return "";
        }
    }

    function product_stock() {
        if(product__obj.stock) {
            return product__obj.stock;
        } else{
            return t("product.manyInStock")
        }
    }

    function set_images_pagination() {
        if(Array.isArray(product__obj.images)) {
            product__obj.images.forEach((el, i) => {
              let pagination__img = document.createElement("img");
              pagination__img.className = "p-2 pagination__image";
              pagination__img.setAttribute("image-id", i);
              pagination__img.alt = `${product__obj.title} - thumbnail ${i + 1} of ${product__obj.images.length}`;
              set_image_fallback(pagination__img, product__obj);
              pagination__img.src = el;
              images__pagination__container.append(pagination__img);
            });
        } else{
          let pagination__img = document.createElement("img");
          pagination__img.className = "p-2 pagination__image";
          pagination__img.setAttribute("image-id", 0);
          pagination__img.alt = `${product__obj.title} - product thumbnail`;
          set_image_fallback(pagination__img, product__obj);
          pagination__img.src = product__obj.images;
          images__pagination__container.append(pagination__img);
        }
    }

    function pagination_control() {
        let images__pagination__container__images = document.querySelectorAll(".images__pagination__container img"),
          images__pagination__control = document.querySelectorAll(".images__pagination__control");

        if(images__pagination__container__images.length <= 2) {
          images__pagination__control.forEach(ele => ele.remove());
        }

    }

    function pagination_images_select() {
      let pagination__images = document.querySelectorAll(".pagination__image");
      pagination__images[0].classList.add("active__image");

      pagination__images.forEach(ele => {
        ele.onclick = function(e) {
          pagination__images.forEach(ele => {ele.classList.remove("active__image")});
          e.currentTarget.classList.add("active__image");
          // change the main image
          let main__image = document.querySelector(".main__image");
          main__image.src = e.currentTarget.src;
          main__image.alt = e.currentTarget.alt;
        }
      });
    }

  });
}

function display_loading_spinner(container) {
  container.innerHTML = "";
  container.classList.add("loading");
  container.innerHTML = `<section class="products__loader justify-content-center align-items-center">
    <div class="spinner-border text-primary spinner-border-sm"
    role="status">
    <span class="visually-hidden">Loading products</span>
    </div>
  </section>`;
}

function cart_items_num() {
  let cart__items__num = document.querySelector(".cart__items__num");
  if(localStorage.getItem("cart-items")) {
    cart__items__num.textContent = JSON.parse(localStorage.getItem("cart-items")).length
  }
}

function category_image_alt(categoryName) {
  if (!categoryName) return "Product category illustration";
  const readable = String(categoryName).replace(/-/g, " ");
  return `Illustration for ${readable} category`;
}

function img_src(element) {
  if(Array.isArray(element.images)) {
      return element.images[0]
  } else{
      return element.images;
  }
}

function fallback_img_src(element) {
  const category = element?.category || "";
  const fallbackImages = {
    "smartphones": ["images/samrtphones.jpg", "images/phones.jpg"],
    "electronics": [
      "images/local-product-images/electronics 1.png",
      "images/local-product-images/electronics 2.png",
      "images/local-product-images/electronics 3.png",
      "images/local-product-images/Hard Drive.png"
    ],
    "laptops": [
      "images/local-product-images/laptops 1.png",
      "images/local-product-images/laptops 2.png",
      "images/local-product-images/laptops 3.png",
      "images/local-product-images/laptops 4.png"
    ],
    "watches": [
      "images/local-product-images/watches1.png",
      "images/local-product-images/watches2.png",
      "images/local-product-images/watches 3.png",
      "images/local-product-images/Leather Strap Skeleton Watch.png"
    ],
    "shoes": [
      "images/local-product-images/shoes1.png",
      "images/local-product-images/shoes2.png",
      "images/local-product-images/shoes3.png"
    ],
    "fragrances": [
      "images/local-product-images/fragrances 1.png",
      "images/local-product-images/fragrances 2.png",
      "images/local-product-images/fragrances 3.png"
    ],
    "skincare": [
      "images/local-product-images/skincare1.png",
      "images/local-product-images/skincare2.png",
      "images/local-product-images/skincare 3.png"
    ],
    "men's products": [
      "images/local-product-images/men's products1.png",
      "images/local-product-images/men's products2.png",
      "images/local-product-images/men's products 2.png",
      "images/local-product-images/men's products 4.png",
      "images/local-product-images/men's products 5.png"
    ],
    "women's products": [
      "images/local-product-images/women's products1.png",
      "images/local-product-images/women's products2.png",
      "images/local-product-images/women's products3.png",
      "images/local-product-images/winterjacket.png"
    ],
    "jewelery": ["images/jewelry.webp"],
    "Hoodies": [
      "images/local-product-images/men's products1.png",
      "images/local-product-images/men's products2.png"
    ],
    "Jackets": [
      "images/local-product-images/men's products 2.png",
      "images/local-product-images/men's products 4.png",
      "images/local-product-images/men's products 5.png"
    ],
    "Pants": [
      "images/local-product-images/men's products2.png",
      "images/local-product-images/men's products 4.png"
    ],
    "T-shirt": [
      "images/local-product-images/men's products1.png",
      "images/local-product-images/men's products 5.png"
    ],
    "T-shirts": [
      "images/local-product-images/men's products1.png",
      "images/local-product-images/men's products 5.png"
    ]
  };

  const title = String(element?.title || "").trim();
  const titleFallbacks = {
    "WD 4TB Gaming Drive Works with Playstation 4 Portable External Hard Drive": "images/local-product-images/Hard Drive.png",
    "Leather Strap Skeleton Watch": "images/local-product-images/Leather Strap Skeleton Watch.png",
    "BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coats": "images/local-product-images/winterjacket.png"
  };

  if(titleFallbacks[title]) {
      return titleFallbacks[title];
  }

  const options = fallbackImages[category] || ["images/images.jpg"];
  const numericId = Number.isFinite(+element?.id) ? +element.id : 0;
  const titleHash = [...title].reduce((total, char) => total + char.charCodeAt(0), 0);
  const fallbackIndex = Math.abs(numericId + titleHash) % options.length;

  return options[fallbackIndex];
}

function set_image_fallback(imageElement, product) {
  const applyFallback = () => {
      const fallbackSrc = fallback_img_src(product);
      if(!imageElement.src.endsWith(fallbackSrc)) {
          imageElement.src = fallbackSrc;
      }
  };

  imageElement.addEventListener("error", applyFallback);

  if(imageElement.complete && imageElement.naturalWidth === 0) {
      applyFallback();
  }
}

function display_cart_preview() {
  let cart__items__preview = document.querySelector(".cart__items__preview"),
      items__id = JSON.parse(localStorage.getItem("cart-items")),
      currency = JSON.parse(localStorage.getItem("currency"));
  // display list
  cart__items__preview.classList.toggle("listed__cart");
  // loading
  cart__items__preview.classList.add("loading");
  cart__items__preview.innerHTML = `
    <div class="cart__loader justify-content-center align-items-center">
        <div class="spinner-border text-primary spinner-border-sm"
        role="status">
        <span class="visually-hidden">Loading...</span>
        </div>
    </div>`;

  fetch_data("all_products.json").then(res => {
    // reset content
    cart__items__preview.classList.remove("loading");
    cart__items__preview.innerHTML = `
    <div class="cart__items position-relative pb-3"></div>

    <div class="cart__summary position-relative pt-2">
      <div class="cart__summary__total pb-3">
        <span class="cart__summary__label">${t("cart.total")}</span> : <span class="mx-2"></span>
      </div>
      <button class="view__cart__btn py-2 px-3">
        <i href="#" class="fa-solid fa-cart-shopping mx-2 text-decoration-none"></i>
        <span>${t("cart.orderNow")}</span>
      </button>
    </div>`;

    let cart__items = document.querySelector(".cart__items");
  // render items
    items__id.forEach(ele => {
      let item = [...all_products][+ele];
      let product__item = document.createElement("div");

      product__item.className = "cart__item position-relative my-3 pb-3";
      product__item.setAttribute("product-id", ele);

      product__item.innerHTML = `
        <i class="fa-solid fa-xmark"></i>
        <div class="cart__item__img__container p-2">
          <img alt="product-image">
        </div>
        <div class="cart__item__info">
          <h2></h2>

          <div class="cart__item__sale d-flex justify-content-between align-items-center mt-4">
            <div class="cart__item__price"></div>

            <div class="product__count d-flex justify-content-between" max-quantity="10">
              <div class="increase__btn d-flex justify-content-center align-items-center py-1"><i class="fa-solid fa-chevron-up"></i></div>
              <span>1</span>
              <div class="decrease__btn d-flex justify-content-center align-items-center py-1"><i class="fa-solid fa-chevron-down"></i></div>
            </div>
          </div>
        </div>
      </div>`

      let cart__item__image = product__item.querySelector(".cart__item__img__container img"),
          cart__item__title = product__item.querySelector(".cart__item__info h2"),
          cart__item__price = product__item.querySelector(".cart__item__price"),
          product__count__num = product__item.querySelector(".product__count span"),
          current__price = (currency.rate * item.price).toFixed(2);

      cart__item__image.setAttribute("alt", `${item.title} - product in shopping cart`);
      set_image_fallback(cart__item__image, item);
      cart__item__image.setAttribute("src", img_src(item));
      cart__item__image.setAttribute("product-id", ele);
      cart__item__title.textContent = translateProductTitle(item.title);
      cart__item__title.setAttribute("data-product-title", item.title);
      cart__item__price.textContent = `${current__price} ${currency.name}`;
      product__count__num.setAttribute("product-price", current__price);
      product__count__num.setAttribute("product-id", item.id);

      cart__items.append(product__item);
    });


// functions
  // delete item
    let del__btn = document.querySelectorAll(".cart__item .fa-xmark");
      cart__items = new Set(JSON.parse(localStorage.getItem("cart-items")));

    del__btn.forEach(ele => {
      ele.onclick = function() {
        let product__id = +ele.parentElement.getAttribute("product-id");
        // remove from local storage
        ele.parentElement.remove();
        cart__items.delete(product__id);
        localStorage.setItem("cart-items", JSON.stringify([...cart__items]));
        // update num of cart items
        cart_items_num();
        // no items
        let product__items = document.querySelectorAll(".cart__item");
        if(product__items.length === 0) {
          cart__items__preview.classList.remove("listed__cart");
          cart__items = new Set();
          localStorage.setItem("cart-items", JSON.stringify([...cart__items]));
        }
        // total price
        total_price()
        showToast(t("cart.removed"), "success");
    }
    });

    // product quantity
    let increase__btn = document.querySelectorAll(".increase__btn"),
        decrease__btn = document.querySelectorAll(".decrease__btn");

    increase__btn.forEach(ele => {
      let product__count__num = ele.nextElementSibling;
      ele.onclick = function() {
        if(+product__count__num.textContent < +ele.parentElement.getAttribute("max-quantity")){
          product__count__num.textContent++;
        }
        total_price();
      }
    });

    decrease__btn.forEach(ele => {
      let product__count__num = ele.previousElementSibling;
      ele.onclick = function() {
        if(+product__count__num.textContent > 1){
          product__count__num.textContent--;
        }
        total_price();
      }
    });

    // total price
    total_price();

    function total_price() {
      let product__count__num = document.querySelectorAll(".product__count span"),
          cart__summary__total = document.querySelector(".cart__summary__total .mx-2");
      const bill = [];

      product__count__num.forEach(ele => {
        let total__price = (ele.textContent * ele.getAttribute("product-price"))
        ele.setAttribute("total-price", total__price);
        bill.push(+ele.getAttribute("total-price"));
      });

      const total = bill.reduce((initial, ele) => {
        return initial + ele;
      }, 0);

      cart__summary__total.textContent = total.toFixed(2) + ` ${currency.name}`;

    }

    // open product preview
    let cart__item__img__container = document.querySelectorAll(".cart__item__img__container img");
    cart__item__img__container.forEach(ele => {
      ele.onclick = function(e) {
        cart__items__preview.classList.remove("listed__cart");
        // display the container
        document.body.classList.add("overlay");
        // render product
        render_preview(e.currentTarget);
      }
    });


  });

}

