import React, { PropsWithChildren } from 'react'

export namespace UI {
  interface BaseProps {
    key?: string | number
    style?: React.CSSProperties
    onClick?: React.MouseEventHandler
    className?: string
    title?: string
  }

  export interface DivProps extends PropsWithChildren<BaseProps> {
    dangerouslySetInnerHTML?: { __html: TrustedHTML | string }
  }

  export interface SpanProps extends PropsWithChildren<BaseProps> {}

  export interface PProps extends PropsWithChildren<BaseProps> {}

  export interface ButtonGroupProps extends PropsWithChildren<BaseProps> {
    vertical?: boolean
  }

  export interface ButtonProps extends PropsWithChildren<BaseProps> {
    variant?: string
    size?: 'sm' | 'lg'
    disabled?: boolean
  }

  export interface RowProps extends PropsWithChildren<BaseProps> {}
  export interface ColProps extends PropsWithChildren<BaseProps> {}

  export interface ImageProps extends BaseProps {
    src: string
    rounded?: boolean
    roundedCircle?: boolean
  }

  export interface LinkProps extends PropsWithChildren<BaseProps> {
    href: string
  }

  export interface SpinnerProps extends BaseProps {
    small?: boolean
  }

  export interface CardProps extends PropsWithChildren<BaseProps> {
    bg?: string
    text?: string
  }
  export interface CardHeaderProps extends PropsWithChildren<BaseProps> {}
  export interface CardBodyProps extends PropsWithChildren<BaseProps> {}
  export interface CardTitleProps extends PropsWithChildren<BaseProps> {}

  export interface ListGroupProps extends PropsWithChildren<BaseProps> {}
  export interface ListGroupItemProps extends PropsWithChildren<BaseProps> {}

  export interface NavbarProps extends PropsWithChildren<BaseProps> {
    fixed?: 'top' | 'bottom'
    bg?: string
  }
  export interface NavbarCollapseProps extends PropsWithChildren<BaseProps> {}
  export interface NavbarBrandProps extends PropsWithChildren<BaseProps> {}

  export interface ToastContainerProps extends PropsWithChildren<BaseProps> {
    position: 'top-end' | 'bottom-start'
    containerPosition: 'fixed'
  }
  export interface ToastProps extends PropsWithChildren<BaseProps> {
    onClose: () => void
    bg: string
  }
  export interface ToastHeaderProps extends PropsWithChildren<BaseProps> {}

  export interface AccordionProps extends PropsWithChildren<BaseProps> {
    open?: boolean
  }
  export interface AccordionHeaderProps extends PropsWithChildren<BaseProps> {}
  export interface AccordionBodyProps extends PropsWithChildren<BaseProps> {}

  export interface BadgeProps extends PropsWithChildren<BaseProps> {
    bg: string
  }

  export interface ModalProps extends PropsWithChildren<BaseProps> {
    show?: boolean
    onHide?: () => void
  }

  export interface ModalHeaderProps extends PropsWithChildren<BaseProps> {}
  export interface ModalBodyProps extends PropsWithChildren<BaseProps> {}
  export interface ModalFooterProps extends PropsWithChildren<BaseProps> {}

  export interface StrongProps extends PropsWithChildren<BaseProps> {}

  export interface InputGroupProps extends PropsWithChildren<BaseProps> {}
  export interface InputGroupTextProps extends PropsWithChildren<BaseProps> {}
  export interface FormControlProps extends PropsWithChildren<BaseProps> {
    value: any
    as?: 'textarea'
    onChange: (ev: React.ChangeEvent<any>) => void
  }
  export interface FormSelectProps extends PropsWithChildren<BaseProps> {
    onChange: (ev: React.ChangeEvent<any>) => void
  }
  export interface FormSelectOptionProps extends PropsWithChildren<BaseProps> {
    value: string
  }

  export interface IconProps extends BaseProps {
    name: string
    size?: number
  }

  export interface OverlayTriggerProps
    extends PropsWithChildren<{ key?: string | number }> {
    overlay: (props: any) => JSX.Element
    placement?: 'right' | 'bottom' | 'top' | 'left'
  }

  export interface TooltipProps extends PropsWithChildren<{}> {
    id: string
  }

  export interface MarkedProps {
    children: string
  }

  export interface ProgressBarProps extends BaseProps {
    now: number
    variant: string
  }
}
