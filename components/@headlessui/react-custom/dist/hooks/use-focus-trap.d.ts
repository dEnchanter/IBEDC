import { MutableRefObject } from 'react';
export declare function useFocusTrap(containers: MutableRefObject<Set<HTMLElement>>, enabled?: boolean, options?: {
    initialFocus?: MutableRefObject<HTMLElement | null>;
}): void;
