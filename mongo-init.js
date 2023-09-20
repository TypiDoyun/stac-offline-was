db = db.getSiblingDB("offline-dbs");

db.createCollection("clothes");
db.createCollection("merchant");
db.createCollection("user");

db.getCollection("merchant").insertMany([
    {
        // _id: {
        //     $oid: "64f5c062dceebeebfc5dab71"
        // },
        id: "typi11",
        username: "김도윤",
        password:
            "$2a$10$AuktzclCRVWcHBIFFmLpqepJSgL8pMYL6qBHWMD/en0UoHrF8aLkC",
        phoneNumber: "01012344321",
        birthday: "061102",
        location: [33.4621910539136, 126.328972924341],
        address: "제주특별자치도 제주시 애월읍 애월리",
        residentNumber: "128939278123",
        shop: {
            name: "엄청난 옷을 파는 옷가게.",
            logo: "https://dy-03-bucket.s3.ap-northeast-2.amazonaws.com/bomb.png",
            shopNumber: "192893727124",
            registrationNumber: "19294812",
            ownerId: {
                $oid: "64f5c062dceebeebfc5dab71"
            }
        },
        createdAt: {
            $date: "2023-09-04T11:32:50.985Z"
        },
        updatedAt: {
            $date: "2023-09-04T11:32:50.985Z"
        },
        currentHashedRefreshToken:
            "$2a$10$sK3ulvmyYPgVaZAgvlhEBOteYRiNFH3Gk5UdVsnOpzs7Mobw8s.nq"
    }
]);

db.getCollection("clothes").insertMany([
    {
        // _id: {
        //     $oid: "64f5c08fdceebeebfc5dab72"
        // },
        name: "가격이엄청비싸지만세일을절대안해주는옷",
        price: 9999999,
        size: ["뿡뿡사이즈", "빵빵사이즈", "뿡삥빵사이즈"],
        comment: "sucks clothes",
        discountRate: 0,
        images: [
            "https://dy-03-bucket.s3.ap-northeast-2.amazonaws.com/bomb.png"
        ],
        ownerId: {
            $oid: "64f5c062dceebeebfc5dab71"
        },
        createdAt: {
            $date: "2023-09-04T11:33:35.323Z"
        },
        updatedAt: {
            $date: "2023-09-04T11:33:35.323Z"
        }
    },
    {
        // _id: {
        //     $oid: "64f5c09cdceebeebfc5dab73"
        // },
        name: "엉덩이가뿡삥빵하는옷",
        price: 9999999,
        size: ["뿡뿡사이즈", "빵빵사이즈", "뿡삥빵사이즈"],
        comment: "sucks clothes",
        discountRate: 0,
        images: [
            "https://dy-03-bucket.s3.ap-northeast-2.amazonaws.com/bomb.png"
        ],
        ownerId: {
            $oid: "64f5c062dceebeebfc5dab71"
        },
        createdAt: {
            $date: "2023-09-04T11:33:48.789Z"
        },
        updatedAt: {
            $date: "2023-09-04T11:33:48.789Z"
        }
    },
    {
        // _id: {
        //     $oid: "64f5c2b0dceebeebfc5dab74"
        // },
        name: "라잎고즈노잉니노잉니노잉니농니",
        price: 9999999,
        size: ["뿡뿡사이즈", "빵빵사이즈", "뿡삥빵사이즈"],
        comment: "sucks clothes",
        discountRate: 0,
        images: [
            "https://dy-03-bucket.s3.ap-northeast-2.amazonaws.com/bomb.png"
        ],
        ownerId: {
            $oid: "64f5c062dceebeebfc5dab71"
        },
        createdAt: {
            $date: "2023-09-04T11:42:40.977Z"
        },
        updatedAt: {
            $date: "2023-09-04T11:42:40.977Z"
        }
    },
    {
        // _id: {
        //     $oid: "64f5c2bddceebeebfc5dab75"
        // },
        name: "먼데이렢미브로큰",
        price: 9999999,
        size: ["뿡뿡사이즈", "빵빵사이즈", "뿡삥빵사이즈"],
        comment: "sucks clothes",
        discountRate: 0,
        images: [
            "https://dy-03-bucket.s3.ap-northeast-2.amazonaws.com/bomb.png"
        ],
        ownerId: {
            $oid: "64f5c062dceebeebfc5dab71"
        },
        createdAt: {
            $date: "2023-09-04T11:42:53.584Z"
        },
        updatedAt: {
            $date: "2023-09-04T11:42:53.584Z"
        }
    },
    {
        // _id: {
        //     $oid: "64f5c2cadceebeebfc5dab76"
        // },
        name: "웬아워즈어영보이",
        price: 9999999,
        size: ["뿡뿡사이즈", "빵빵사이즈", "뿡삥빵사이즈"],
        comment: "sucks clothes",
        discountRate: 0,
        images: [
            "https://dy-03-bucket.s3.ap-northeast-2.amazonaws.com/bomb.png"
        ],
        ownerId: {
            $oid: "64f5c062dceebeebfc5dab71"
        },
        createdAt: {
            $date: "2023-09-04T11:43:06.793Z"
        },
        updatedAt: {
            $date: "2023-09-04T11:43:06.793Z"
        }
    },
    {
        // _id: {
        //     $oid: "64f5c2dadceebeebfc5dab77"
        // },
        name: "포포포포커페이스포포포커페이스",
        price: 9999999,
        size: ["뿡뿡사이즈", "빵빵사이즈", "뿡삥빵사이즈"],
        comment: "sucks clothes",
        discountRate: 0,
        images: [
            "https://dy-03-bucket.s3.ap-northeast-2.amazonaws.com/bomb.png"
        ],
        ownerId: {
            $oid: "64f5c062dceebeebfc5dab71"
        },
        createdAt: {
            $date: "2023-09-04T11:43:22.929Z"
        },
        updatedAt: {
            $date: "2023-09-04T11:43:22.929Z"
        }
    }
]);
