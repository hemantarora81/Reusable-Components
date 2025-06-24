import { default as React } from 'react';

export declare const ThemeProvider: React.FC<{
    children: React.ReactNode;
}>;
export declare const useTheme: () => {
    theme: string;
    toggleTheme: () => void;
};
