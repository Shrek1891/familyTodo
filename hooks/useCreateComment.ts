import {useDealSlideStore} from "~/store/slide";
import {useMutation} from "@tanstack/vue-query";
import {DB_ID} from "~/app.constants";

export const useCommentMutation = ({refetch}: { refetch: () => void }) => {
    const store = useDealSlideStore()
    const commentRef = ref('')
    const {mutate} = useMutation({
        mutationKey: ['add comment', commentRef.value],
        mutationFn: () => {
            return DB.createDocument(DB_ID, 'comments', ID.unique(), {
                text: commentRef.value,
                deal: store.card?.id
            })
        },
        onSuccess: () => {
            commentRef.value = ''
            refetch()
        }
    })
    const writeComment = () => {
        if (commentRef.value) {
            mutate()
        }
    }
    return {commentRef, writeComment}
}