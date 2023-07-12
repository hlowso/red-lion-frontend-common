import React, { createContext, PropsWithChildren, useContext } from 'react'
import { UI } from '../types/ui-components'

interface Props {
  children: React.ReactNode
  components: Context
}

interface Context {
  Div: (props: UI.DivProps) => JSX.Element | null
  Span: (props: UI.SpanProps) => JSX.Element | null
  P: (props: UI.PProps) => JSX.Element | null
  ButtonGroup: (props: UI.ButtonGroupProps) => JSX.Element | null
  Button: (props: UI.ButtonProps) => JSX.Element | null
  Row: (props: UI.RowProps) => JSX.Element | null
  Col: (props: UI.ColProps) => JSX.Element | null
  Image: (props: UI.ImageProps) => JSX.Element | null
  Link: (props: UI.LinkProps) => JSX.Element | null
  Spinner: (props: UI.SpinnerProps) => JSX.Element | null
  Navbar: (props: UI.NavbarProps) => JSX.Element | null
  NavbarCollapse: (props: UI.NavbarProps) => JSX.Element | null
  NavbarBrand: (props: UI.NavbarProps) => JSX.Element | null
  ToastContainer: (props: UI.ToastContainerProps) => JSX.Element | null
  Toast: (props: UI.ToastProps) => JSX.Element | null
  Card: (props: UI.CardProps) => JSX.Element | null
  CardHeader: (props: UI.CardHeaderProps) => JSX.Element | null
  ListGroup: (props: UI.ListGroupProps) => JSX.Element | null
  ListGroupItem: (props: UI.ListGroupItemProps) => JSX.Element | null
  Accordion: (props: UI.AccordionProps) => JSX.Element | null
  AccordionHeader: (props: UI.AccordionHeaderProps) => JSX.Element | null
  AccordionBody: (props: UI.AccordionBodyProps) => JSX.Element | null
  Badge: (props: UI.BadgeProps) => JSX.Element | null
  Modal: (props: UI.ModalProps) => JSX.Element | null
  ModalHeader: (props: UI.ModalHeaderProps) => JSX.Element | null
  Strong: (props: UI.StrongProps) => JSX.Element | null
  InputGroup: (props: UI.InputGroupProps) => JSX.Element | null
  FormControl: (props: UI.FormControlProps) => JSX.Element | null
  Icon: (props: UI.IconProps) => JSX.Element | null
  OverlayTrigger: (props: UI.OverlayTriggerProps) => JSX.Element | null
  Tooltip: (props: UI.TooltipProps) => JSX.Element | null
  Marked: (props: UI.MarkedProps) => JSX.Element | null
}

const UIContext = createContext<Context>({
  Div: () => null,
  Span: () => null,
  P: () => null,
  ButtonGroup: () => null,
  Button: () => null,
  Row: () => null,
  Col: () => null,
  Image: () => null,
  Link: () => null,
  Spinner: () => null,
  Navbar: () => null,
  NavbarCollapse: () => null,
  NavbarBrand: () => null,
  ToastContainer: () => null,
  Toast: () => null,
  Card: () => null,
  CardHeader: () => null,
  ListGroup: () => null,
  ListGroupItem: () => null,
  Accordion: () => null,
  AccordionHeader: () => null,
  AccordionBody: () => null,
  Badge: () => null,
  Modal: () => null,
  ModalHeader: () => null,
  Strong: () => null,
  InputGroup: () => null,
  FormControl: () => null,
  Icon: () => null,
  OverlayTrigger: () => null,
  Tooltip: () => null,
  Marked: () => null
})

export const useUIContext = () => useContext(UIContext)
export const UIProvider = ({ children, components }: Props) => {
  return <UIContext.Provider value={components}>{children}</UIContext.Provider>
}
