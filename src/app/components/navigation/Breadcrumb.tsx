export type BreadcrumbItem = {
  label: string;
  href?: string;
  onClick?: () => void;
};

export type BreadcrumbProps = {
  items: BreadcrumbItem[];
  /** Extra SLDS classes on the list (e.g. "slds-m-bottom_xx-small"). */
  className?: string;
};

/** SLDS Breadcrumbs blueprint (nav › ol.slds-breadcrumb.slds-list_horizontal.slds-wrap › li.slds-breadcrumb__item › a). */
export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav role="navigation" aria-label="Breadcrumbs" className={className}>
      <ol className="slds-breadcrumb slds-list_horizontal slds-wrap">
        {items.map((item) => (
          <li key={item.label} className="slds-breadcrumb__item">
            <a
              href={item.href ?? "#"}
              onClick={(e) => {
                if (!item.href) e.preventDefault();
                item.onClick?.();
              }}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
