/*
  Warnings:

  - You are about to drop the column `text` on the `QuestionOption` table. All the data in the column will be lost.
  - You are about to drop the column `text` on the `QuizQuestion` table. All the data in the column will be lost.
  - Added the required column `answer` to the `QuestionOption` table without a default value. This is not possible if the table is not empty.
  - Added the required column `question` to the `QuizQuestion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "QuestionOption" DROP COLUMN "text",
ADD COLUMN     "answer" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "QuizQuestion" DROP COLUMN "text",
ADD COLUMN     "question" TEXT NOT NULL;
