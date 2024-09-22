import {events, stores} from '../../model'
import {useUnit} from "effector-react";
import {Input, Text} from "@mantine/core";

export function AuthForm () {
    const { derivedStore, onMyEvent} = useUnit({derivedStore:stores.$derived_store, onMyEvent: events.onMyEvent});
    return (
        <>
        <Input onInput={(e) => onMyEvent(e.currentTarget.value)} />
        <Text>{derivedStore}</Text>
        </>
    )
}