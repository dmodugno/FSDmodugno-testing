// Mode definitions and constants for the Home experience

export const MODES = {
  BASELINE: 'baseline',
  RESEARCH: 'research',
  BUILD_TREE: 'build-tree',
  EXPLORE: 'explore',
  TEMPLE: 'temple'
};

export const BASELINE_STATES = {
  NO_CONTEXT: 'no-context',
  CONTEXTUAL_ENTRY: 'contextual-entry',
  EMPTY_TREE: 'empty-tree',
  ASSISTED_SESSION: 'assisted-session'
};

export const MODE_LABELS = {
  [MODES.BASELINE]: 'Getting Started',
  [MODES.RESEARCH]: 'Research',
  [MODES.BUILD_TREE]: 'Build Tree',
  [MODES.EXPLORE]: 'Explore',
  [MODES.TEMPLE]: 'Temple'
};

export const BASELINE_STATE_LABELS = {
  [BASELINE_STATES.NO_CONTEXT]: 'No Context',
  [BASELINE_STATES.CONTEXTUAL_ENTRY]: 'Contextual Entry',
  [BASELINE_STATES.EMPTY_TREE]: 'Empty Tree',
  [BASELINE_STATES.ASSISTED_SESSION]: 'Assisted Session'
};
