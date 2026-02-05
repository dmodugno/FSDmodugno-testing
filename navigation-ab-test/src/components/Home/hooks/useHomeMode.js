import { useState, useEffect } from 'react';
import { useUser } from '../../../contexts/UserContext';
import { MODES, BASELINE_STATES } from '../utils/modeConfig';

// Mock mode detection logic - will be replaced with real API
function detectUserMode(user) {
  // Check explicit mode selections first (highest priority)

  // Temple mode (explicit, LDS only)
  if (user.lastMode === 'temple' && user.churchMembership === 'LDS') {
    return {
      mode: MODES.TEMPLE,
      baselineState: null,
      confidence: 'high',
      source: 'explicit'
    };
  }

  // Research mode
  if (user.lastMode === 'research') {
    return {
      mode: MODES.RESEARCH,
      baselineState: null,
      confidence: 'high',
      source: 'explicit'
    };
  }

  // Build Tree mode
  if (user.lastMode === 'build-tree' || user.lastMode === 'tree') {
    return {
      mode: MODES.BUILD_TREE,
      baselineState: null,
      confidence: 'high',
      source: 'explicit'
    };
  }

  // Explore mode
  if (user.lastMode === 'explore') {
    return {
      mode: MODES.EXPLORE,
      baselineState: null,
      confidence: 'high',
      source: 'explicit'
    };
  }

  // Empty tree → Empty Tree baseline (check after explicit modes)
  if (!user.treeSize || user.treeSize === 0) {
    return {
      mode: MODES.BASELINE,
      baselineState: BASELINE_STATES.EMPTY_TREE,
      confidence: 'high',
      source: 'inferred'
    };
  }

  // Contextual entry (user came from specific context)
  if (user.entryContext && user.lastAction) {
    return {
      mode: MODES.BASELINE,
      baselineState: BASELINE_STATES.CONTEXTUAL_ENTRY,
      confidence: 'high',
      source: 'inferred'
    };
  }

  // Assisted session (helper mode)
  if (user.isHelper) {
    return {
      mode: MODES.BASELINE,
      baselineState: BASELINE_STATES.ASSISTED_SESSION,
      confidence: 'high',
      source: 'explicit'
    };
  }

  // Default to baseline no-context
  return {
    mode: MODES.BASELINE,
    baselineState: BASELINE_STATES.NO_CONTEXT,
    confidence: 'low',
    source: 'default'
  };
}

export function useHomeMode() {
  const { user } = useUser();
  const [mode, setMode] = useState(null);
  const [baselineState, setBaselineState] = useState(null);
  const [modeData, setModeData] = useState(null);

  useEffect(() => {
    if (user) {
      const detected = detectUserMode(user);
      setMode(detected.mode);
      setBaselineState(detected.baselineState);
      setModeData(detected);
    }
  }, [user]);

  // Allow manual override for testing
  const overrideMode = (newMode, newBaselineState = null) => {
    setMode(newMode);
    setBaselineState(newBaselineState);
  };

  return {
    mode,
    baselineState,
    confidence: modeData?.confidence,
    source: modeData?.source,
    setMode: overrideMode,
    setBaselineState
  };
}
