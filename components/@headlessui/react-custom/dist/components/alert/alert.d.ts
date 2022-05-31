import { ElementType } from 'react';
import { Props } from '../../types';
declare type Importance = 
/**
 * Indicates that updates to the region should be presented at the next
 * graceful opportunity, such as at the end of speaking the current sentence
 * or when the user pauses typing.
 */
'polite'
/**
 * Indicates that updates to the region have the highest priority and should
 * be presented the user immediately.
 */
 | 'assertive';
declare let DEFAULT_ALERT_TAG: "div";
interface AlertRenderPropArg {
    importance: Importance;
}
declare type AlertPropsWeControl = 'role';
export declare function Alert<TTag extends ElementType = typeof DEFAULT_ALERT_TAG>(props: Props<TTag, AlertRenderPropArg, AlertPropsWeControl> & {
    importance?: Importance;
}): import("react").ReactElement<any, string | ((props: any) => import("react").ReactElement<any, string | any | (new (props: any) => import("react").Component<any, any, any>)> | null) | (new (props: any) => import("react").Component<any, any, any>)> | null;
export {};
