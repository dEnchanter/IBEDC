import React, { ElementType, ReactNode } from 'react';
import { Props } from '../../types';
export declare function useLabels(id?: string): [string | undefined, (props: {
    children: ReactNode;
}) => JSX.Element];
declare let DEFAULT_LABEL_TAG: "label";
interface LabelRenderPropArg {
}
declare type LabelPropsWeControl = 'id';
export declare function Label<TTag extends ElementType = typeof DEFAULT_LABEL_TAG>(props: Props<TTag, LabelRenderPropArg, LabelPropsWeControl>): React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)> | null;
export {};
