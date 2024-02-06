import { renderHook } from '@testing-library/react-hooks'
import { useIsMobile } from '../useIsMobile'
import { beforeAll, describe, expect, it, jest } from '@jest/globals'
import { ThemeProvider } from '@mui/material/index'
import { createTheme } from '@mui/material/styles'

// Mock the theme with breakpoints
const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
})

// Wrapper component to provide theme context
const wrapper = ({ children }: { children: React.ReactNode }) => <ThemeProvider theme={theme}>{children}</ThemeProvider>

describe('useIsMobile', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(
        (query): MediaQueryList => ({
          matches: (query as string).includes('max-width:599.95px'),
          media: query as string,
          onchange: null,
          addListener: jest.fn(), // deprecated
          removeListener: jest.fn(), // deprecated
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn<() => boolean>(),
        }),
      ),
    })
  })

  it('returns true when screen width is less than or equal to small breakpoint', () => {
    const { result } = renderHook(() => useIsMobile(), { wrapper })

    expect(result.current).toBe(true)
  })

  it('returns false when screen width is greater than small breakpoint', () => {
    const { result } = renderHook(() => useIsMobile(), { wrapper })

    expect(result.current).toBe(false)
  })
})
