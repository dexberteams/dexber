import { notFound } from "next/navigation";
import teamData from "@/data/team.json";
import TeamDetails from "./TeamDetails";

export default async function Page({
  params,
}: {
  params: Promise<{
    locale: string;
    id: string;
  }>;
}) {
  const { id, locale } = await params;

  const member = teamData.members.find((m) => m.id === id);

  if (!member) {
    notFound();
  }

  return (
    <TeamDetails
      member={member}
      locale={locale}
    />
  );
}