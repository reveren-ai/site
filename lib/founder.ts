// Founder bio block. Photo is owner-provided per HANDOFF.md §10 ("Replace
// founder bio photo — uploads/founder-placeholder.jpg not yet provided").
// Until the real photo lands we render the brand monogram as a placeholder.

export const founder = {
  eyebrow: "Built by",
  name: "Innocent Muisha",
  role: "Founder, reveren",
  quote:
    "I built reveren because I was tired of correcting the agent. The fix isn't a smarter model. The fix is an operating manual the agent reads before it touches your repo. Try it for an hour. Tell me whether the output got better.",
  // When the photo lands, set photoUrl to "/founder/innocent-muisha.jpg" or
  // similar and the FounderBio component will render an <Image> instead.
  photoUrl: null as string | null,
};
