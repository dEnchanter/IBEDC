import { ReactNode } from 'react';
declare type OnUpdate = (message: StackMessage, element: HTMLElement) => void;
export declare enum StackMessage {
    AddElement = 0,
    RemoveElement = 1
}
export declare function useStackContext(): OnUpdate;
export declare function useElemenStack(element: HTMLElement | null): void;
export declare function StackProvider({ children, onUpdate, }: {
    children: ReactNode;
    onUpdate?: OnUpdate;
}): JSX.Element;
export {};
