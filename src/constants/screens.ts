import {
  Home,
  Accordion,
  TikTokDisc,
  BottomSheet,
  DragAndDrop,
  Transitions,
  ScrollEvents,
  InitialExample,
  ColorInterpolation,
  CustomBottomTabNavigator,
  LiquidSwipe,
} from '@/Screens';
import {FunctionComponent} from 'react';

interface Screens {
  Home: Screen;
  InitialExample: Screen;
  ScrollEvents: Screen;
  DragAndDrop: Screen;
  Accordion: Screen;
  TikTokDisc: Screen;
  Transitions: Screen;
  BottomSheet: Screen;
  CustomBottomTabNavigator: Screen;
  ColorInterpolation: Screen;
  LiquidSwipe: Screen;
}

interface Screen {
  name: keyof Screens;
  component: FunctionComponent<any>;
  title: string;
  image?: string;
  description?: string;
}

const SCREENS: {[key in keyof Screens]: Screen} = {
  Home: {
    name: 'Home',
    component: Home,
    title: 'Index',
  },
  InitialExample: {
    name: 'InitialExample',
    component: InitialExample,
    title: 'Initial Example',
    image: 'https://image.flaticon.com/icons/png/512/4568/4568760.png',
    description: 'Get in touch with React Native Reanimated V2',
  },
  ScrollEvents: {
    name: 'ScrollEvents',
    component: ScrollEvents,
    title: 'Scroll Events',
    image: 'https://image.flaticon.com/icons/png/512/4568/4568733.png',
    description:
      'Check how you can hear the user Scroll action and do anything with it',
  },
  DragAndDrop: {
    name: 'DragAndDrop',
    component: DragAndDrop,
    title: 'Drag and Drop',
    image: 'https://image.flaticon.com/icons/png/512/4568/4568722.png',
    description:
      'Check how you can hear the user Drag and Drop action and do anything with it',
  },
  Accordion: {
    name: 'Accordion',
    component: Accordion,
    title: 'Accordion',
    image: 'https://image.flaticon.com/icons/png/512/4568/4568748.png',
    description: 'Check how you can achieve an Accordion component',
  },
  TikTokDisc: {
    name: 'TikTokDisc',
    component: TikTokDisc,
    title: 'TikTok Disc',
    image: 'https://image.flaticon.com/icons/png/512/4568/4568772.png',
    description: 'Check how you can achieve the TikTok disc animation',
  },
  Transitions: {
    name: 'Transitions',
    component: Transitions,
    title: 'Transitions',
    image: 'https://image.flaticon.com/icons/png/512/4568/4568780.png',
    description: 'Check how you can achieve nice transitions',
  },
  BottomSheet: {
    name: 'BottomSheet',
    component: BottomSheet,
    title: 'Bottom Sheet',
    image: 'https://image.flaticon.com/icons/png/512/4568/4568790.png',
    description: 'Check how you can create a nice Bottom Modal',
  },
  CustomBottomTabNavigator: {
    name: 'CustomBottomTabNavigator',
    component: CustomBottomTabNavigator,
    title: 'Custom Bottom Tab Navigator',
    image: 'https://image.flaticon.com/icons/png/512/4568/4568797.png',
    description:
      'Check how you can create your own custom Bottom Tab Navigator',
  },
  ColorInterpolation: {
    name: 'ColorInterpolation',
    component: ColorInterpolation,
    title: 'Color Interpolation',
    image: 'https://image.flaticon.com/icons/png/512/4568/4568806.png',
    description: 'Check how you can achieve a Color Interpolation',
  },
  LiquidSwipe: {
    name: 'LiquidSwipe',
    component: LiquidSwipe,
    title: 'Liquid Swipe by Cuberto',
    image: 'https://image.flaticon.com/icons/png/512/4568/4568834.png',
    description:
      'Check how you can achieve the beautiful effect Liquid Swipe by Cuberto',
  },
};

interface ScreenGroup {
  name: keyof ScreenGroups;
  label: string;
  screens: Screen[];
}

interface ScreenGroups {
  Basis: ScreenGroup;
  BeginnerExamples: ScreenGroup;
  IntermediateExamples: ScreenGroup;
  AdvancedExamples: ScreenGroup;
}

const SCREEN_GROUPS: {
  [key in keyof ScreenGroups]: ScreenGroup;
} = {
  Basis: {
    name: 'Basis',
    label: 'Basis',
    screens: [
      SCREENS.InitialExample,
      SCREENS.ScrollEvents,
      SCREENS.ColorInterpolation,
      SCREENS.DragAndDrop,
    ],
  },
  BeginnerExamples: {
    name: 'BeginnerExamples',
    label: 'Beginner Examples',
    screens: [SCREENS.Transitions, SCREENS.TikTokDisc],
  },
  IntermediateExamples: {
    name: 'IntermediateExamples',
    label: 'Intermediate Examples',
    screens: [SCREENS.Accordion, SCREENS.CustomBottomTabNavigator],
  },
  AdvancedExamples: {
    name: 'AdvancedExamples',
    label: 'Advanced Examples',
    screens: [SCREENS.BottomSheet, SCREENS.LiquidSwipe],
  },
};

export {SCREENS, SCREEN_GROUPS};
export type {ScreenGroups, ScreenGroup};
