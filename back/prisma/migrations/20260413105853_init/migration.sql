-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "kakaoId" TEXT NOT NULL,
    "nickname" TEXT,
    "profileImage" TEXT,
    "email" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_kakaoId_key" ON "User"("kakaoId");
