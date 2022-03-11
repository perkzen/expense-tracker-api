-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "expanses" (
    "id" SERIAL NOT NULL,
    "amount" INTEGER NOT NULL,
    "text" TEXT,

    CONSTRAINT "expanses_pkey" PRIMARY KEY ("id")
);
