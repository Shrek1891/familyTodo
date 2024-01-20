import {useQuery} from "@tanstack/vue-query";
import {DB} from "~/utils/appwrite";
import {DB_ID} from "~/app.constants";
import {homeData} from "~/data/homeData";
import type {IColumn} from "~/types/homePageTypes";
import type {IDeal} from "~/types/dealsTypes";

export function useHomeQuery() {
    return useQuery({
        queryKey: ['deals'],
        queryFn: () => DB.listDocuments(DB_ID, 'deals'),
        select(data) {
            const newBoard: IColumn[] = homeData.map(
                column => ({
                    ...column,
                    cards: []
                })
            )
            const deals = data.documents as unknown as IDeal[]
            for (const deal of deals) {
                const column = newBoard.find((col) => col.id === deal.status);
                if (column) {
                    column.cards.push({
                        id: deal.$id,
                        name: deal.name,
                        price: deal.price,
                        $createdAt: deal.$createdAt,
                        companyName: deal.customer.name,
                        status: column.name
                    });
                }
            }
            return newBoard
        }
    })
}