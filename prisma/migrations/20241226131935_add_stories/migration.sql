-- CreateTable
CREATE TABLE "stories" (
    "id" TEXT NOT NULL,
    "userid" TEXT NOT NULL,
    "imageurl" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "stories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "stories_id_key" ON "stories"("id");

-- AddForeignKey
ALTER TABLE "stories" ADD CONSTRAINT "stories_userid_fkey" FOREIGN KEY ("userid") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
