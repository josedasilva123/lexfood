import "styled-components"

declare module "styled-components" {
    export interface DefaultTheme{
        colors: {
            white: string;
            lightgray: string;
            orange: string;
            black: string;
            black20: string;
            lockOrange: string;
            lockWhite: string;
        }
    }
}
