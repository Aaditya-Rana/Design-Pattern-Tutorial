declare module '*.mdx' {
    import type { ReactElement } from 'react';
    const component: (props: unknown) => ReactElement;
    export default component;
}
