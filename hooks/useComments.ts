import {useDealSlideStore} from "~/store/slide";
import {useQuery} from "@tanstack/vue-query";
import {DB_ID} from "~/app.constants";

export const useCommentsByDeal = () => {
    const store = useDealSlideStore();
    const cardId = store.card?.id || '';
    return useQuery({
        queryKey: ['comments', cardId],
        queryFn: () => DB.getDocument(DB_ID, 'deals', cardId),
    })

}