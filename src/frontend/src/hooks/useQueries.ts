import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useActor } from "./useActor";

export function useGetChatHistory() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["chatHistory"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllChatMessages();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddChatMessage() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      question,
      response,
    }: { question: string; response: string }) => {
      if (!actor) return;
      await actor.addChatMessage(question, response);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chatHistory"] });
    },
  });
}

export function useSubmitScore() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (score: number) => {
      if (!actor) return;
      await actor.submitScore(BigInt(score));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["scores"] });
    },
  });
}

export function useGetAllScores() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["scores"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllScores();
    },
    enabled: !!actor && !isFetching,
  });
}
