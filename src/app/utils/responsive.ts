/**
 * Responsive Design Utilities & Helpers
 * Provides reusable responsive patterns and utility functions
 */

import React from 'react';

export const ResponsiveUtils = {
  /**
   * Breakpoint values matching Tailwind CSS
   */
  breakpoints: {
    sm: 640,    // Small devices, tablets
    md: 768,    // Medium devices, tablets landscape
    lg: 1024,   // Desktop
    xl: 1280,   // Large desktop
    xl2: 1536,  // Extra large screens
  },

  /**
   * Media query helpers
   */
  mediaQueries: {
    mobile: '(max-width: 767px)',
    tablet: '(min-width: 768px) and (max-width: 1023px)',
    desktop: '(min-width: 1024px)',
    largeDesktop: '(min-width: 1280px)',
    smallOnly: '(max-width: 639px)',
    smAndUp: '(min-width: 640px)',
    mdAndUp: '(min-width: 768px)',
    lgAndUp: '(min-width: 1024px)',
  },

  /**
   * Responsive padding classes (as examples - use Tailwind in components)
   * Structure: base | sm | md | lg
   */
  spacing: {
    xs: { base: '0.5rem', sm: '0.625rem', md: '0.75rem' },
    sm: { base: '0.75rem', sm: '1rem', md: '1.25rem' },
    md: { base: '1rem', sm: '1.25rem', md: '1.5rem' },
    lg: { base: '1.5rem', sm: '1.75rem', md: '2rem' },
    xl: { base: '2rem', sm: '2.25rem', md: '2.5rem' },
  },

  /**
   * Responsive font sizes
   */
  fontSize: {
    xs: { base: '0.75rem', sm: '0.8125rem' },
    sm: { base: '0.875rem', sm: '0.9375rem' },
    base: { base: '1rem', sm: '1.0625rem', md: '1.125rem' },
    lg: { base: '1.125rem', sm: '1.25rem', md: '1.375rem' },
    xl: { base: '1.25rem', sm: '1.5rem', md: '1.75rem' },
    xl2: { base: '1.5rem', sm: '1.875rem', md: '2rem' },
  },

  /**
   * Grid column configurations
   */
  gridCols: {
    auto: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    '2': 'grid grid-cols-1 md:grid-cols-2',
    '3': 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    '4': 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4',
  },

  /**
   * Common responsive patterns
   */
  patterns: {
    containerFluid: 'w-full px-4 sm:px-6 md:px-8 mx-auto',
    containerMaxWidth: 'w-full max-w-2xl lg:max-w-4xl mx-auto px-4 sm:px-6 md:px-0',
    flexResponsive: 'flex flex-col sm:flex-row',
    buttonResponsive: 'px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base rounded-lg transition-all',
    buttonFullMobile: 'w-full sm:w-auto',
    inputResponsive: 'w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 text-sm',
  },
};

/**
 * Custom Hook: useResponsive
 * Provides responsive breakpoint information
 */
export function useResponsive() {
  const [isMobile, setIsMobile] = React.useState(false);
  const [isTablet, setIsTablet] = React.useState(false);
  const [isDesktop, setIsDesktop] = React.useState(false);
  const [windowSize, setWindowSize] = React.useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  React.useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      setWindowSize({ width, height });
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
      setIsDesktop(width >= 1024);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    isMobile,
    isTablet,
    isDesktop,
    windowSize,
    breakpoint: isDesktop ? 'lg' : isTablet ? 'md' : 'sm',
  };
}

/**
 * Helper: Get responsive class based on screen size
 */
export function getResponsiveClass(
  mobileClass: string,
  tabletClass?: string,
  desktopClass?: string
): string {
  const classes = [mobileClass];
  if (tabletClass) classes.push(`sm:${tabletClass}`);
  if (desktopClass) classes.push(`md:${desktopClass}`);
  return classes.join(' ');
}

/**
 * Returns Tailwind grid classes based on column count
 */
export function getGridColsClass(cols: 2 | 3 | 4 = 3): string {
  const gridMap = {
    2: 'grid grid-cols-1 md:grid-cols-2',
    3: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4',
  };
  return gridMap[cols];
}

/**
 * Utility to check if a media query matches
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = React.useState(false);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mediaQuery.addEventListener('change', handler);

    return () => mediaQuery.removeEventListener('change', handler);
  }, [query]);

  return matches;
}
