import { createFileRoute } from "@tanstack/react-router";
import { mockAgents } from "@/mocks/data";
import { AgentBuilder } from "./agents.new";

export const Route = createFileRoute("/agents/$agentId")({
  component: () => {
    const { agentId } = Route.useParams();
    const a = mockAgents.find((x) => x.id === agentId);
    return <AgentBuilder title={a?.name ?? "Agent"} />;
  },
});
