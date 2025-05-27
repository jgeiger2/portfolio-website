import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
  	extend: {
  		colors: {
  			editor: {
  				bg: '#1F2937',
  				border: '#374151',
  				text: '#F3F4F6',
  				placeholder: '#9CA3AF',
  				toolbar: {
  					bg: '#1F2937',
  					button: '#9CA3AF',
  					buttonHover: '#F3F4F6',
  					buttonActive: '#60A5FA',
  					divider: '#374151'
  				},
  				code: {
  					bg: '#374151',
  					text: '#F3F4F6'
  				},
  				highlight: '#FBBF24'
  			},
  			primary: {
  				'50': '#eefaff',
  				'100': '#dbf1ff',
  				'200': '#b8e8ff',
  				'300': '#83daff',
  				'400': '#48c4ff',
  				'500': '#1eaaff',
  				'600': '#0088ff',
  				'700': '#0071e2',
  				'800': '#0762be',
  				'900': '#0c529a',
  				'950': '#0b3974',
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				'50': '#f4f1ff',
  				'100': '#ece5ff',
  				'200': '#ded1ff',
  				'300': '#c3adff',
  				'400': '#a37eff',
  				'500': '#8a4eff',
  				'600': '#7c2dff',
  				'700': '#6a1de3',
  				'800': '#5919be',
  				'900': '#49169a',
  				'950': '#2c0974',
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			accent: {
  				'50': '#edfcfa',
  				'100': '#d0f7f2',
  				'200': '#a5eee5',
  				'300': '#6de0d4',
  				'400': '#36c7bc',
  				'500': '#1ca69d',
  				'600': '#158981',
  				'700': '#156e69',
  				'800': '#165754',
  				'900': '#174847',
  				'950': '#05302e',
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			tertiary: {
  				'50': '#fff1f2',
  				'100': '#ffe0e4',
  				'200': '#ffc9d1',
  				'300': '#ffa3b3',
  				'400': '#ff758b',
  				'500': '#ff4365',
  				'600': '#f32147',
  				'700': '#cf1338',
  				'800': '#af1335',
  				'900': '#961537',
  				'950': '#530616'
  			},
  			background: 'hsl(var(--background))',
  			glass: {
  				light: 'rgba(255, 255, 255, 0.25)',
  				dark: 'rgba(15, 23, 42, 0.45)'
  			},
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			muted: 'hsl(var(--muted))',
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			brand: 'hsl(var(--brand))',
  			'brand-foreground': 'hsl(var(--brand-foreground))',
  			'muted-foreground': 'hsl(var(--muted-foreground))'
  		},
  		backgroundImage: {
  			'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
  			'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
  			'gradient-playful': 'linear-gradient(165deg, var(--tw-gradient-stops))'
  		},
  		boxShadow: {
  			glass: '0 4px 30px rgba(0, 0, 0, 0.1)',
  			'playful-sm': '4px 4px 0px 0px var(--tw-shadow-color)',
  			'playful-md': '6px 6px 0px 0px var(--tw-shadow-color)',
  			'playful-lg': '8px 8px 0px 0px var(--tw-shadow-color)',
  			'glow-primary': '0 0 15px rgba(30, 170, 255, 0.5)',
  			'glow-primary-hover': '0 0 25px rgba(30, 170, 255, 0.7)',
  			'glow-accent': '0 0 15px rgba(28, 166, 157, 0.5)',
  			'glow-accent-hover': '0 0 25px rgba(28, 166, 157, 0.7)',
  			'glow-tertiary': '0 0 15px rgba(255, 67, 101, 0.5)',
  			'glow-tertiary-hover': '0 0 25px rgba(255, 67, 101, 0.7)'
  		},
  		backdropBlur: {
  			glass: '16px'
  		},
  		animation: {
  			float: 'float 6s ease-in-out infinite',
  			'float-delayed': 'float 6s ease-in-out 2s infinite',
  			'float-slow': 'float 12s ease-in-out infinite',
  			'float-delayed-slow': 'float 12s ease-in-out 3s infinite',
  			'bounce-slow': 'bounce 3s ease-in-out infinite',
  			'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  			appear: 'appear 0.5s ease-out forwards',
  			'appear-zoom': 'appear-zoom 0.5s ease-out forwards',
  			'float1': 'float1 12s ease-in-out infinite',
  			'float2': 'float2 14s ease-in-out infinite',
  		},
  		keyframes: {
  			float: {
  				'0%, 100%': {
  					transform: 'translateY(0)'
  				},
  				'50%': {
  					transform: 'translateY(-15px)'
  				}
  			},
  			appear: {
  				'0%': {
  					opacity: '0',
  					transform: 'translateY(10px)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateY(0)'
  				}
  			},
  			'appear-zoom': {
  				'0%': {
  					opacity: '0',
  					transform: 'scale(0.95)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'scale(1)'
  				}
  			},
  			float1: {
  				'0%, 100%': {
  					transform: 'translateY(0) scale(1)'
  				},
  				'25%': {
  					transform: 'translateY(-20px) scale(1.05)'
  				},
  				'50%': {
  					transform: 'translateY(10px) scale(0.97)'
  				},
  				'75%': {
  					transform: 'translateY(-10px) scale(1.03)'
  				}
  			},
  			float2: {
  				'0%, 100%': {
  					transform: 'translateY(0) scale(1)'
  				},
  				'20%': {
  					transform: 'translateY(15px) scale(1.04)'
  				},
  				'50%': {
  					transform: 'translateY(-18px) scale(0.96)'
  				},
  				'80%': {
  					transform: 'translateY(12px) scale(1.02)'
  				}
  			}
  		},
  		borderRadius: {
  			playful: '0.75rem 0.25rem 0.75rem 0.25rem',
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;

