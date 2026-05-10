-- CreateTable
CREATE TABLE "waitlist_signups" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "tier" TEXT NOT NULL,
    "company" TEXT,
    "seats" INTEGER,
    "useCase" TEXT,
    "source" TEXT,
    "ipHash" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "waitlist_signups_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "waitlist_signups_tier_idx" ON "waitlist_signups"("tier");

-- CreateIndex
CREATE INDEX "waitlist_signups_email_idx" ON "waitlist_signups"("email");

-- CreateIndex
CREATE INDEX "waitlist_signups_createdAt_idx" ON "waitlist_signups"("createdAt");
