import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react"

// ===========================
// グローバルテーマ設定
// クールなダーク系ネイビー・ブルーで統一
// ===========================
const config = defineConfig({
    globalCss: {
        "html, body": {
            minHeight: "100%",
            // 背景はダークネイビーで統一
            bg: "brand.950",
            color: "brand.50",
        },
        body: {
            margin: 0,
            fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
        },
        p: {
            margin: 0,
            marginTop: "0.5em",
            marginBottom: "0.5em",
            fontSize: "16px",
            color: "brand.100",
        }
    },
    theme: {
        tokens: {
            colors: {
                // メインカラー: クールなネイビー〜シアン系
                brand: {
                    50: { value: "#E8F4FD" },
                    100: { value: "#BEE3F8" },
                    200: { value: "#90CDF4" },
                    300: { value: "#63B3ED" },
                    400: { value: "#4299E1" },
                    500: { value: "#3182CE" },
                    600: { value: "#2B6CB0" },
                    700: { value: "#2C5282" },
                    800: { value: "#2A4365" },
                    900: { value: "#1A365D" },
                    950: { value: "#0D1B2E" },
                },
                // アクセントカラー: 明るいシアン（ホバーや強調に使用）
                accent: {
                    300: { value: "#76E4F7" },
                    400: { value: "#0BC5EA" },
                    500: { value: "#00B5D8" },
                },
                // 危険操作用カラー
                danger: {
                    400: { value: "#FC8181" },
                    500: { value: "#E53E3E" },
                }
            },
        },
    },
})

export const system = createSystem(defaultConfig, config)