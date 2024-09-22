import {createEvent, createStore, sample} from "effector";

/**
 * events
 * stores(mutable) example: books[]
 * samples
 * derived stores(immutable) example: dedicated book by id (like computed in mobx)
 */
export const createAuthFactory = () => {
    const onMyEvent = createEvent<string>('');

    const $myMutableStore = createStore<Array<string>>([]);

    sample({
        clock: onMyEvent,
        source: $myMutableStore,
        fn: (sourceData, eventData) => {
            const splitted = eventData.split('').join("_");
            return [...sourceData, splitted];
        },
        target: $myMutableStore
    })

    const $derived_store = $myMutableStore.map((stringArray) => stringArray[0]);

    return {events: { onMyEvent },
        stores: {
             $derived_store
        },
    };
}