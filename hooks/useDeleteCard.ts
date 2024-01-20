import {useMutation} from "@tanstack/vue-query";
import {DB_ID} from "~/app.constants";

const useDeleteCard = (cardId: any) => {
    const {mutate, reset, isPending} = useMutation({
        mutationKey: ['deals', cardId],
        mutationFn: () => {
            return DB.deleteDocument(DB_ID, 'deals', cardId)
        },
    })
    return {mutate, reset, isPending}
}

export default useDeleteCard