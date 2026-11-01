import type { ReactNode } from "react";
import { ButtonIcon } from "../buttons/ButtonIcon";
import { Avatar, type AvatarContent } from "../feedback/Avatar";
import { Badge } from "../feedback/Badge";
import { Icon } from "../icons/Icon";
import { cx } from "../utils/cx";

export type GlobalHeaderFavorites = {
  /** Current record is a favourite (star pressed). */
  selected?: boolean;
  /** Page doesn't support favourites (Figma: "This item doesn't support favorites"). */
  disabled?: boolean;
  onToggle?: () => void;
  onOpenList?: () => void;
};

/** "fixed" = SLDS default (pinned to the viewport top); "inline" = in normal flow (ConsoleShell, showcase). */
export type GlobalHeaderPosition = "fixed" | "inline";

export type GlobalHeaderProps = {
  /** Logo in the 12.5rem logo area (e.g. <img alt="ArmadaCare" src=…/>). Empty by default, as in Figma. */
  logo?: ReactNode;
  /** Search control for the centre slot — e.g. <Input hideLabel iconLeft="utility:search" … />. */
  search?: ReactNode;
  /** Omit to hide the favourites pair. */
  favorites?: GlobalHeaderFavorites;
  onGlobalActions?: () => void;
  onHelp?: () => void;
  onSetup?: () => void;
  /** Unread notifications; 0 / undefined hides the badge. */
  notificationCount?: number;
  onNotifications?: () => void;
  /** User avatar (round, medium) — the trigger of the user menu. */
  avatar: AvatarContent;
  /** Accessible name of the avatar button (the user's name). */
  userName: string;
  onAvatar?: () => void;
  /**
   * Sandbox / environment row above the header (Figma: panel toggle + "Sandbox (CXDev)").
   * Not part of the SLDS blueprint — rendered with SLDS ButtonIcon + Badge.
   */
  environment?: { label: string; onTogglePanel?: () => void };
  position?: GlobalHeaderPosition;
};

/** SLDS Global Header blueprint (skip links, logo, search slot, global actions). */
export function GlobalHeader({
  logo,
  search,
  favorites,
  onGlobalActions,
  onHelp,
  onSetup,
  notificationCount = 0,
  onNotifications,
  avatar,
  userName,
  onAvatar,
  environment,
  position = "fixed",
}: GlobalHeaderProps) {
  const notificationText = notificationCount > 0 ? `${notificationCount} new notifications` : "no new notifications";

  return (
    <header className={cx("slds-global-header_container", position === "inline" && "slds-is-relative")}>
      <a href="#navigation" className="slds-assistive-text slds-assistive-text_focus">
        Skip to Navigation
      </a>
      <a href="#main-content" className="slds-assistive-text slds-assistive-text_focus">
        Skip to Main Content
      </a>
      {environment ? (
        <div className="slds-grid slds-grid_vertical-align-center slds-p-horizontal_small slds-p-vertical_xx-small slds-border_bottom slds-theme_default">
          <ButtonIcon
            iconName="utility:rows"
            assistiveText="Toggle Panel"
            variant="container"
            onClick={environment.onTogglePanel}
            className="slds-m-right_x-small"
          />
          <Badge variant="lightest">
            <span className="slds-badge__icon slds-badge__icon_left">
              <Icon name="utility:setup" size="xx-small" tone="current" />
            </span>
            {environment.label}
          </Badge>
        </div>
      ) : null}
      <div className="slds-global-header slds-grid slds-grid_align-spread">
        <div className="slds-global-header__item">
          <div className="slds-global-header__logo">{logo}</div>
        </div>
        {search ? <div className="slds-global-header__item slds-global-header__item_search">{search}</div> : null}
        <div className="slds-global-header__item">
          <ul className="slds-global-actions">
            {favorites ? (
              <li className="slds-global-actions__item">
                <div className="slds-global-actions__favorites slds-dropdown-trigger slds-dropdown-trigger_click">
                  <div className="slds-button-group">
                    <ButtonIcon
                      iconName="utility:favorite"
                      assistiveText="Toggle Favorite"
                      title={favorites.disabled ? "This item doesn't support favorites" : "Toggle Favorites"}
                      variant="border"
                      size="small"
                      pressed={Boolean(favorites.selected)}
                      disabled={favorites.disabled}
                      onClick={favorites.onToggle}
                      className={cx("slds-global-actions__favorites-action", favorites.disabled && "slds-is-disabled")}
                    />
                    <ButtonIcon
                      iconName="utility:down"
                      assistiveText="View Favorites"
                      variant="border"
                      size="small"
                      iconSize="small"
                      onClick={favorites.onOpenList}
                      className="slds-global-actions__favorites-more"
                    />
                  </div>
                </div>
              </li>
            ) : null}
            {onGlobalActions ? (
              <li className="slds-global-actions__item">
                <div className="slds-dropdown-trigger slds-dropdown-trigger_click">
                  <ButtonIcon
                    iconName="utility:add"
                    assistiveText="Global Actions"
                    variant="container"
                    size="small"
                    aria-haspopup="true"
                    onClick={onGlobalActions}
                    className="slds-global-actions__task slds-global-actions__item-action"
                  />
                </div>
              </li>
            ) : null}
            {onHelp ? (
              <li className="slds-global-actions__item">
                <div className="slds-dropdown-trigger slds-dropdown-trigger_click">
                  <ButtonIcon
                    iconName="utility:question"
                    assistiveText="Help and Training"
                    variant="container"
                    size="small"
                    aria-haspopup="true"
                    onClick={onHelp}
                    className="slds-global-actions__help slds-global-actions__item-action"
                    iconClassName="slds-global-header__icon"
                  />
                </div>
              </li>
            ) : null}
            {onSetup ? (
              <li className="slds-global-actions__item">
                <div className="slds-dropdown-trigger slds-dropdown-trigger_click">
                  <ButtonIcon
                    iconName="utility:setup"
                    assistiveText="Setup"
                    variant="container"
                    size="small"
                    aria-haspopup="true"
                    onClick={onSetup}
                    className="slds-global-actions__setup slds-global-actions__item-action"
                    iconClassName="slds-global-header__icon"
                  />
                </div>
              </li>
            ) : null}
            <li className="slds-global-actions__item">
              <div className="slds-dropdown-trigger slds-dropdown-trigger_click">
                <ButtonIcon
                  iconName="utility:notification"
                  assistiveText={notificationText}
                  variant="container"
                  size="small"
                  aria-live="assertive"
                  aria-atomic="true"
                  onClick={onNotifications}
                  className={cx(
                    "slds-global-actions__notifications slds-global-actions__item-action",
                    notificationCount > 0 && "slds-incoming-notification",
                  )}
                  iconClassName="slds-global-header__icon"
                />
                <span
                  aria-hidden="true"
                  className={cx(
                    "slds-notification-badge",
                    notificationCount > 0 && "slds-incoming-notification slds-show-notification",
                  )}
                >
                  {notificationCount > 0 ? notificationCount : null}
                </span>
              </div>
            </li>
            <li className="slds-global-actions__item">
              <div className="slds-dropdown-trigger slds-dropdown-trigger_click">
                <button
                  type="button"
                  className="slds-button slds-global-actions__avatar slds-global-actions__item-action"
                  title={userName}
                  aria-haspopup="true"
                  onClick={onAvatar}
                >
                  <Avatar content={avatar} shape="circle" size="medium" />
                  <span className="slds-assistive-text">{userName}</span>
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
