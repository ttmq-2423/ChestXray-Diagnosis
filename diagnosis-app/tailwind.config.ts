import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        'screen-xl': '75rem',
        'screen-2xl': '83.75rem'
      },
      boxShadow: {
        'cause-shadow': '0px 4px 17px 0px #00000008',
      },
      transitionDuration: {
        '150': '150ms',
      },
      spacing: {
        '6.25': '6.25rem',
        '70%': '70%',
        '40%': '40%',
        '30%': '30%',
        '80%': '80%',
        8.5: '8.5rem',
        50: '50rem',
        51: "54.375rem",
        25: '35.625rem',
        29: '28rem',
        120: '120rem',
        45: '45rem',
        94: '22.5rem',
        85: '21rem',
        3.75: '3.75rem'
      },
      inset: {
        '5%': '5%',
        '35%': '35%'
      },
      zIndex: {
        '1': '1',
        '2': '2',
        '999': '999'
      },
      colors: {
        

        primary: "#336699",         // Xanh biển dịu nhẹ
        secondary: "#54C5D0",       // Xanh ngọc (nhấn nhẹ)

        // === Văn bản / nền ===
        midnight_text: "#1A1A1A",   // Chữ chính (đậm)
        grey: "#FFFFFF",            // Nền trắng sáng
        darkmode: "#0B1D2D",        // Nền tối khi dark mode
        darklight: "#0C2F40",       // Nền phụ trong dark mode
        deepSlate: "#2F3E4E",       // Màu chữ ở dark mode
        slateGray: "#3A4A58",       // Phụ cho text mờ/placeholder
        light_grey: "#EAEFF2",      // Nền xám nhạt
        muted: "#A0AAB2",           // Text phụ

        // === Thông báo trạng thái ===
        error: "#E53935",           // Đỏ lỗi
        warning: "#FB8C00",         // Vàng cảnh báo
        success: "#43A047",         // Xanh thành công

        // === Các màu khác ===
        border: "#D1D5DB",          // Viền nhẹ
        section: "#6B7280",         // Màu section phụ
        dark_border: "#94A3B8",     // Viền trong dark mode
        tealGreen: "#388E81",       // Accent xanh lục nhẹ
        charcoalGray: "#4B5563",
        tealBlue: "#dfe5ff"
      },
      fontSize: {
        86: [
          "5.375rem",
          {
            lineHeight: "1.2",
          }
        ],
        76: [
          "4.75rem",
          {
            lineHeight: "1.2",
          }
        ],
        70: [
          "4.375rem",
          {
            lineHeight: "1.2",
          }
        ],
        54: [
          "3.375rem",
          {
            lineHeight: "1.2",
          }
        ],
        44: [
          "2.75rem",
          {
            lineHeight: "1.3",
          }
        ],
        40: [
          "2.5rem",
          {
            lineHeight: "3rem",
          },
        ],
        36: [
          "2.25rem",
          {
            lineHeight: "2.625rem",
          },
        ],
        30: [
          "1.875rem",
          {
            lineHeight: "2.25rem",
          },
        ],
        28: [
          "1.75rem",
          {
            lineHeight: "2.25rem",
          },
        ],
        24: [
          "1.5rem",
          {
            lineHeight: "2rem",
          },
        ],
        22: [
          "1.375rem",
          {
            lineHeight: "2rem",
          },
        ],
        21: [
          "1.3125rem",
          {
            lineHeight: "1.875rem",
          },
        ],
        18: [
          "1.125rem",
          {
            lineHeight: "1.5rem",
          },
        ],
        17: [
          "1.0625rem",
          {
            lineHeight: "1.4875rem",
          },
        ],
        16: [
          "1rem",
          {
            lineHeight: "1.6875rem",
          },
        ],
        14: [
          "0.875rem",
          {
            lineHeight: "1.225rem",
          },
        ],
      },
      backgroundImage: {
        "start": "url('/images/work/bg-start.png')",
        "perk": "url('/images/perks/perk-bg.png')",
      },
      blur: {
        220: '220px',
        400: '400px',
      }
    },
  },
  plugins: [],
};
export default config;
