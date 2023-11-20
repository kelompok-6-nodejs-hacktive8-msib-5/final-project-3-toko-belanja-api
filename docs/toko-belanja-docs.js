export const tokoBelanjaDocs = {
  openapi: "3.0.3",
  info: {
    title: "Toko Belanja API",
    description:
      "API yang dapat CRUD produk dan kategori beserta melihat transaksi histori pengguna",
    version: "1.0.0",
  },
  servers: [
    {
      url: "",
      description: "Toko Belanja RESTful API server",
    },
  ],
  paths: {
    "/users/register": {
      post: {
        summary: "Registrasi Pengguna",
        description: "Endpoint untuk mendaftarkan pengguna baru",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  full_name: {
                    type: "string",
                  },
                  gender: {
                    type: "string",
                  },
                  email: {
                    type: "string",
                  },
                  password: {
                    type: "string",
                  },
                },
                example: {
                  full_name: "John Doe",
                  gender: "male",
                  email: "johndoe@gmail.com",
                  password: "johndoe123",
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: "Registrasi berhasil",
          },
          409: {
            description: "Email atau username telah terdaftar",
          },
          500: {
            description: "Kesalahan server",
          },
        },
        tags: ["Autentikasi"],
      },
    },
    "/users/login": {
      post: {
        summary: "Login Pengguna",
        description: "Endpoint untuk login pengguna",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: {
                    type: "string",
                    description: "Alamat email pengguna",
                  },
                  password: {
                    type: "string",
                    description: "Kata sandi pengguna",
                  },
                },
                example: {
                  email: "johndoe@gmail.com",
                  password: "johndoe123",
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Login berhasil",
          },
          401: {
            description: "Email atau password salah",
          },
          500: {
            description: "Kesalahan server",
          },
        },
        tags: ["Autentikasi"],
      },
    },
    "/users": {
      put: {
        summary: "Edit Pengguna",
        description: "Endpoint untuk edit pengguna",
        security: [
          {
            headerToken: [],
          },
        ],
        parameters: [
          {
            $ref: "#/components/parameters/token",
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  full_name: {
                    type: "string",
                    description: "Nama lengkap pengguna",
                  },
                  email: {
                    type: "string",
                    description: "Alamat email pengguna",
                  },
                },
                example: {
                  full_name: "John Doe",
                  email: "johndoe@gmail.com",
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Edit pengguna berhasil",
          },
          401: {
            description: "Unauthorized",
          },
          404: {
            description: "Pengguna tidak ditemukan",
          },
          500: {
            description: "Internal server error",
          },
        },
        tags: ["Pengguna"],
      },
      delete: {
        summary: "Hapus Pengguna",
        description: "Endpoint untuk hapus pengguna",
        security: [
          {
            headerToken: [],
          },
        ],
        parameters: [
          {
            $ref: "#/components/parameters/token",
          },
        ],
        responses: {
          200: {
            description: "Hapus pengguna berhasil",
          },
          401: {
            description: "Unauthorized",
          },
          404: {
            description: "Pengguna tidak ditemukan",
          },
          500: {
            description: "Internal server error",
          },
        },
        tags: ["Pengguna"],
      },
    },
    "/users/topup": {
      patch: {
        summary: "Topup saldo pengguna",
        description: "Endpoint untuk topup saldo pengguna",
        security: [
          {
            headerToken: [],
          },
        ],
        parameters: [
          {
            $ref: "#/components/parameters/token",
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  balance: {
                    type: "integer",
                    description: "saldo pengguna",
                  },
                },
                example: {
                  balance: 50000,
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Topup saldo berhasil",
          },
          401: {
            description: "Unauthorized",
          },
          404: {
            description: "Pengguna tidak ditemukan",
          },
          500: {
            description: "Internal server error",
          },
        },
        tags: ["Pengguna"],
      },
    },
    "/categories": {
      post: {
        summary: "Membuat kategori",
        description: "Endpoint untuk membuat kategori",
        security: [
          {
            headerToken: [],
          },
        ],
        parameters: [
          {
            $ref: "#/components/parameters/token",
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  type: {
                    type: "string",
                    description: "Tipe kategori",
                  },
                },
                example: {
                  type: "Elektronik",
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: "Kategori berhasil dibuat",
          },
          401: {
            description: "Unauthorized",
          },
          404: {
            description: "Pengguna tidak ditemukan",
          },
          500: {
            description: "Internal server error",
          },
        },
        tags: ["Kategori"],
      },
      get: {
        summary: "Mendapatkan informasi kategori",
        description: "Endpoint untuk mendapatkan informasi kategori",
        security: [
          {
            headerToken: [],
          },
        ],
        parameters: [
          {
            $ref: "#/components/parameters/token",
          },
        ],
        responses: {
          200: {
            description: "Kategori berhasil di dapatkan",
          },
          401: {
            description: "Unauthorized",
          },
          404: {
            description: "Pengguna tidak ditemukan",
          },
          500: {
            description: "Internal server error",
          },
        },
        tags: ["Kategori"],
      },
    },
    "/categories/{categoryId}": {
      patch: {
        summary: "Edit kategori",
        description: "Endpoint untuk edit kategori",
        security: [
          {
            headerToken: [],
          },
        ],
        parameters: [
          {
            $ref: "#/components/parameters/token",
          },
          {
            name: "categoryId",
            in: "path",
            required: true,
            description: "Id kategori untuk edit",
            schema: {
              type: "string",
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  type: {
                    type: "string",
                    description: "Tipe kategori",
                  },
                },
                example: {
                  type: "Elektronik",
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Edit kategori berhasil",
          },
          401: {
            description: "Unauthorized",
          },
          404: {
            description: "Kategori atau pengguna tidak ditemukan",
          },
          500: {
            description: "Internal server error",
          },
        },
        tags: ["Kategori"],
      },
      delete: {
        summary: "Hapus kategori",
        description: "Endpoint untuk hapus kategori",
        security: [
          {
            headerToken: [],
          },
        ],
        parameters: [
          {
            $ref: "#/components/parameters/token",
          },
          {
            name: "categoryId",
            in: "path",
            required: true,
            description: "Id kategori untuk hapus",
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "Hapus kategori berhasil",
          },
          401: {
            description: "Unauthorized",
          },
          404: {
            description: "Kategori atau pengguna tidak ditemukan",
          },
          500: {
            description: "Internal server error",
          },
        },
        tags: ["Kategori"],
      },
    },
    "/products": {
      post: {
        summary: "Membuat produk",
        description: "Endpoint untuk membuat produk",
        security: [
          {
            headerToken: [],
          },
        ],
        parameters: [
          {
            $ref: "#/components/parameters/token",
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  title: {
                    type: "string",
                    description: "Nama produk",
                  },
                  price: {
                    type: "integer",
                    description: "Harga produk",
                  },
                  stock: {
                    type: "integer",
                    description: "Stok produk",
                  },
                  CategoryId: {
                    type: "integer",
                    description: "kategori produk",
                  },
                },
                example: {
                  title: "MacBook Pro M2",
                  price: 21499000,
                  stock: 10,
                  CategoryId: 1,
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: "Produk berhasil dibuat",
          },
          401: {
            description: "Unauthorized",
          },
          404: {
            description: "Pengguna tidak ditemukan",
          },
          500: {
            description: "Internal server error",
          },
        },
        tags: ["Produk"],
      },
      get: {
        summary: "Mendapatkan informasi produk",
        description: "Endpoint untuk mendapatkan informasi produk",
        security: [
          {
            headerToken: [],
          },
        ],
        parameters: [
          {
            $ref: "#/components/parameters/token",
          },
        ],
        responses: {
          200: {
            description: "produk berhasil di dapatkan",
          },
          401: {
            description: "Unauthorized",
          },
          404: {
            description: "Pengguna tidak ditemukan",
          },
          500: {
            description: "Internal server error",
          },
        },
        tags: ["Produk"],
      },
    },
    "/products/{productId}": {
      put: {
        summary: "Edit produk",
        description: "Endpoint untuk edit produk",
        security: [
          {
            headerToken: [],
          },
        ],
        parameters: [
          {
            $ref: "#/components/parameters/token",
          },
          {
            name: "productId",
            in: "path",
            required: true,
            description: "Id produk untuk edit",
            schema: {
              type: "string",
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  title: {
                    type: "string",
                    description: "Nama produk",
                  },
                  price: {
                    type: "integer",
                    description: "Harga produk",
                  },
                  stock: {
                    type: "integer",
                    description: "Stok produk",
                  },
                },
                example: {
                  title: "MacBook Pro M2",
                  price: 21499000,
                  stock: 9,
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Edit produk berhasil",
          },
          401: {
            description: "Unauthorized",
          },
          404: {
            description: "Produk atau pengguna tidak ditemukan",
          },
          500: {
            description: "Internal server error",
          },
        },
        tags: ["Produk"],
      },
      patch: {
        summary: "Edit produk",
        description: "Endpoint untuk edit produk",
        security: [
          {
            headerToken: [],
          },
        ],
        parameters: [
          {
            $ref: "#/components/parameters/token",
          },
          {
            name: "productId",
            in: "path",
            required: true,
            description: "Id produk untuk edit",
            schema: {
              type: "string",
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  CategoryId: {
                    type: "integer",
                    description: "Kategori produk",
                  },
                },
                example: {
                  CategoryId: 1,
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Edit produk berhasil",
          },
          401: {
            description: "Unauthorized",
          },
          404: {
            description: "Produk atau pengguna tidak ditemukan",
          },
          500: {
            description: "Internal server error",
          },
        },
        tags: ["Produk"],
      },
      delete: {
        summary: "Hapus produk",
        description: "Endpoint untuk hapus produk",
        security: [
          {
            headerToken: [],
          },
        ],
        parameters: [
          {
            $ref: "#/components/parameters/token",
          },
          {
            name: "productId",
            in: "path",
            required: true,
            description: "Id produk untuk hapus",
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "Hapus produk berhasil",
          },
          401: {
            description: "Unauthorized",
          },
          404: {
            description: "Produk atau pengguna tidak ditemukan",
          },
          500: {
            description: "Internal server error",
          },
        },
        tags: ["Produk"],
      },
    },
    "/transactions": {
      post: {
        summary: "Membuat transaksi",
        description: "Endpoint untuk membuat transaksi",
        security: [
          {
            headerToken: [],
          },
        ],
        parameters: [
          {
            $ref: "#/components/parameters/token",
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  productId: {
                    type: "integer",
                    description: "Id produk",
                  },
                  quantity: {
                    type: "integer",
                    description: "Jumlah produk",
                  },
                },
                example: {
                  productId: 1,
                  quantity: 1,
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: "Transaksi berhasil dibuat",
          },
          401: {
            description: "Unauthorized",
          },
          404: {
            description: "Produk atau Pengguna tidak ditemukan",
          },
          500: {
            description: "Internal server error",
          },
        },
        tags: ["Transaksi"],
      },
    },
    "/transactions/{transactionId}": {
      get: {
        summary: "Mendapatkan informasi transaksi salah satu pengguna",
        description:
          "Endpoint untuk Mendapatkan informasi transaksi salah satu pengguna",
        security: [
          {
            headerToken: [],
          },
        ],
        parameters: [
          {
            $ref: "#/components/parameters/token",
          },
          {
            name: "transactionId",
            in: "path",
            required: true,
            description: "Id transaksi untuk mendapatkan informasi",
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          201: {
            description: "Transaksi berhasil dibuat",
          },
          401: {
            description: "Unauthorized",
          },
          404: {
            description: "Transaksi Id atau Pengguna tidak ditemukan",
          },
          500: {
            description: "Internal server error",
          },
        },
        tags: ["Transaksi"],
      },
    },
    "/transactions/user": {
      get: {
        summary: "Mendapatkan informasi transaksi pengguna",
        description: "Endpoint untuk mendapatkan informasi transaksi pengguna",
        security: [
          {
            headerToken: [],
          },
        ],
        parameters: [
          {
            $ref: "#/components/parameters/token",
          },
        ],
        responses: {
          200: {
            description: "Transaksi pengguna berhasil di dapatkan",
          },
          401: {
            description: "Unauthorized",
          },
          404: {
            description: "Transaksi atau pengguna tidak ditemukan",
          },
          500: {
            description: "Internal server error",
          },
        },
        tags: ["Transaksi"],
      },
    },
    "/transactions/admin": {
      get: {
        summary: "Mendapatkan informasi transaksi admin",
        description: "Endpoint untuk mendapatkan informasi transaksi admin",
        security: [
          {
            headerToken: [],
          },
        ],
        parameters: [
          {
            $ref: "#/components/parameters/token",
          },
        ],
        responses: {
          200: {
            description: "Transaksi admin berhasil di dapatkan",
          },
          401: {
            description: "Unauthorized",
          },
          404: {
            description: "Transaksi atau pengguna tidak ditemukan",
          },
          500: {
            description: "Internal server error",
          },
        },
        tags: ["Transaksi"],
      },
    },
  },
  components: {
    parameters: {
      token: {
        name: "token",
        in: "header",
        required: false,
        description: "Token pengguna",
        schema: {
          type: "string",
        },
      },
    },
    securitySchemes: {
      headerToken: {
        type: "apiKey",
        in: "header",
        name: "token",
      },
    },
  },
};
