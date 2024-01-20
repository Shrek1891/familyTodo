<script setup lang="ts">
import {useDealSlideStore} from "~/store/slide";
import {useCommentsByDeal} from "~/hooks/useComments";
import {useCommentMutation} from "~/hooks/useCreateComment";
import type {IDeal} from "~/types/dealsTypes";
import dayjs from "dayjs";

const store = useDealSlideStore()
const {data, refetch, isLoading} = useCommentsByDeal()
const {commentRef, writeComment} = useCommentMutation({refetch})
const card = data as unknown as IDeal
</script>
<template>
  <div class="comments">
    <input
        type="text"
        tabindex="1"
        @focus="true"
        class="input"
        placeholder="Add comment"
        v-model="commentRef"
        @keyup.enter="writeComment"
    />
    <Skeleton v-if="isLoading"/>
    <div v-else-if="card">
      <div
          class="comment"
          v-for="comment in card?.comments"
          :key="comment.$id"
      >
        <Icon name="ep:comment" size="20"/>
        <span>{{ comment.text }}</span>
        <p>{{ dayjs(comment.$createdAt).format('HH:mm') }}</p>
      </div>
    </div>
  </div>
</template>
<style scoped>
.comments {
  height: 50vh;
  gap: 2rem;
}

span {
  margin-left: 1rem;
  font-size: 14px;
}

p {
  font-size: 12px;
  font-style: italic;
  margin-right: 1rem;
  text-align: right;
}

.input {
  margin: 1rem 0;
  width: 100%;
  height: 30px;
  box-sizing: border-box;
  line-height: 30px;
  font-size: 14px;
  border: 0;
  background: none;
  border-bottom: 1px solid #ccc;
  outline: none;
  border-radius: 0;
  color: black;
}

.input:focus {
  border-bottom: var(--color-indigo-700) 2px solid;
}

.input:-webkit-autofill {
  background: var(--color-grey-800);
  transition: all 5000s ease-in-out;
}
</style>