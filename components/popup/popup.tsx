"use client";

import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

type PopupOverlayProps = {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  actions?: ReactNode;
  showCloseButton?: boolean;
  closeOnBackdrop?: boolean;
  closeOnEsc?: boolean;
  boxClassName?: string;
  className?: string;
  ariaLabel?: string;
};

const useControllableState = (
  controlled: boolean | undefined,
  defaultValue: boolean | undefined,
  onChange?: (v: boolean) => void
) => {
  const [uncontrolled, setUncontrolled] = useState<boolean>(!!defaultValue);
  const isControlled = typeof controlled === "boolean";
  const value = isControlled ? !!controlled : uncontrolled;

  const setValue = useCallback(
    (v: boolean) => {
      if (isControlled) {
        onChange?.(v);
      } else {
        setUncontrolled(v);
        onChange?.(v);
      }
    },
    [isControlled, onChange]
  );

  return [value, setValue] as const;
};

const Portal = ({ children }: { children: ReactNode }) => {
  const [mounted, setMounted] = useState(false);
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setMounted(true);
    rootRef.current = document.body;
    return () => setMounted(false);
  }, []);

  if (!mounted || !rootRef.current) return null;
  return createPortal(children, rootRef.current);
};

const ScrollLock = ({ active }: { active: boolean }) => {
  useEffect(() => {
    if (!active) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [active]);
  return null;
};

const CloseIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={`h-5 w-5 ${className ?? ""}`}
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M6.225 4.811a1 1 0 0 1 1.414 0L12 9.172l4.361-4.361a1 1 0 1 1 1.414 1.414L13.414 10.586l4.361 4.361a1 1 0 1 1-1.414 1.414L12 12l-4.361 4.361a1 1 0 1 1-1.414-1.414l4.361-4.361-4.361-4.361a1 1 0 0 1 0-1.414Z"
      clipRule="evenodd"
    />
  </svg>
);

const PopupOverlay = ({
  open,
  defaultOpen,
  onOpenChange,
  title,
  description,
  children,
  actions,
  showCloseButton = true,
  closeOnBackdrop = true,
  closeOnEsc = true,
  boxClassName = "",
  className = "",
  ariaLabel,
}: PopupOverlayProps) => {
  const [isOpen, setIsOpen] = useControllableState(
    open,
    defaultOpen,
    onOpenChange
  );

  const titleId = useMemo(
    () => `popup-title-${Math.random().toString(36).slice(2)}`,
    []
  );
  const descId = useMemo(
    () => `popup-desc-${Math.random().toString(36).slice(2)}`,
    []
  );

  const close = useCallback(() => setIsOpen(false), [setIsOpen]);

  useEffect(() => {
    if (!closeOnEsc || !isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        close();
      }
    };
    window.addEventListener("keydown", onKey, { capture: true });
    return () => {
      window.removeEventListener("keydown", onKey, {
        capture: true,
      } as any);
    };
  }, [closeOnEsc, isOpen, close]);

  if (!isOpen) return null;

  return (
    <Portal>
      <ScrollLock active={isOpen} />
      <div
        className={`modal modal-open ${className} text-primary-content`}
        aria-modal="true"
        role="dialog"
        aria-labelledby={title ? titleId : undefined}
        aria-describedby={description ? descId : undefined}
        aria-label={!title ? ariaLabel : undefined}
      >
        <div className={`modal-box ${boxClassName}`}>
          {(title || showCloseButton) && (
            <div className="flex items-start justify-between gap-4 mb-2">
              {title && (
                <h3 id={titleId} className="text-lg font-bold">
                  {title}
                </h3>
              )}
              {showCloseButton && (
                <button
                  type="button"
                  aria-label="Close"
                  className="btn btn-ghost btn-sm"
                  onClick={close}
                >
                  <CloseIcon />
                </button>
              )}
            </div>
          )}

          {description && (
            <p id={descId} className="opacity-70 mb-4">
              {description}
            </p>
          )}

          <div className="space-y-3">{children}</div>

          {actions && <div className="modal-action">{actions}</div>}
        </div>

        <button
          className="modal-backdrop"
          aria-label="Close overlay"
          onClick={closeOnBackdrop ? close : undefined}
        />
      </div>
    </Portal>
  );
};

export default PopupOverlay;
