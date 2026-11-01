import { EnvironmentChecks } from "./EnvironmentChecks";
import { FoundationsSection } from "./FoundationsSection";
import { IconsSection } from "./IconsSection";
import { ButtonsSection } from "./ButtonsSection";
import { FormsSection } from "./FormsSection";
import { FeedbackSection } from "./FeedbackSection";
import { OverlaysSection } from "./OverlaysSection";
import { FigmaCompareSection } from "./FigmaCompareSection";
import { FigmaComparePatterns } from "./FigmaComparePatterns";
import { ShellSection } from "./ShellSection";
import { PageSection } from "./PageSection";
import { DataSection } from "./DataSection";
import { CardsSection } from "./CardsSection";
import { DialogsSection } from "./DialogsSection";
import { Phase4Section } from "./Phase4Section";

/** /showcase — every design-system component in every variant and state. Phases 1–4: foundations, primitives, patterns, additions. */
export function ShowcasePage() {
  return (
    <main className="slds-p-around_large">
      <header className="slds-m-bottom_large">
        <h1 className="slds-text-heading_large">ArmadaCare Admin Portal — Design System</h1>
        <p className="slds-text-body_regular slds-text-color_weak">
          SLDS 1 (@salesforce-ux/design-system 2.264.3) · ArmadaCare theme · Phases 1–4: foundations, primitives, patterns and Phase 4 additions
        </p>
      </header>
      <EnvironmentChecks />
      <FoundationsSection />
      <IconsSection />
      <ButtonsSection />
      <FormsSection />
      <FeedbackSection />
      <OverlaysSection />
      <ShellSection />
      <PageSection />
      <DataSection />
      <CardsSection />
      <DialogsSection />
      <Phase4Section />
      <FigmaCompareSection />
      <FigmaComparePatterns />
    </main>
  );
}
