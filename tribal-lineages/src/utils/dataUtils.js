import data from '../data/genealogyData.json';

export const getPersonById = (id) => {
  return data.persons.find(p => p.id === id);
};

export const getGroupById = (id) => {
  return data.groups.find(g => g.id === id);
};

export const getChildrenOfPerson = (personId) => {
  return data.persons.filter(p => p.fatherId === personId || p.motherId === personId);
};

export const getGroupsByPerson = (personId) => {
  const person = getPersonById(personId);
  if (!person) return [];
  return person.groupMembershipIds.map(gId => getGroupById(gId)).filter(Boolean);
};

export const getFounderGroup = (personId) => {
  const person = getPersonById(personId);
  if (!person || !person.founderOfGroupId) return null;
  return getGroupById(person.founderOfGroupId);
};

export const getPersonsByGroupId = (groupId) => {
  const group = getGroupById(groupId);
  if (!group) return [];
  return group.memberPersonIds.map(pId => getPersonById(pId)).filter(Boolean);
};

export const getChildGroupsOfGroup = (groupId) => {
  const group = getGroupById(groupId);
  if (!group) return [];
  return group.childGroupIds.map(gId => getGroupById(gId)).filter(Boolean);
};

export const getSiblingGroups = (groupId) => {
  const group = getGroupById(groupId);
  if (!group || !group.parentGroupId) return [];

  const parent = getGroupById(group.parentGroupId);
  if (!parent) return [];

  return parent.childGroupIds.map(gId => getGroupById(gId)).filter(Boolean);
};

// Recursively get all descendant group IDs for a given group
export const getAllDescendantGroupIds = (groupId) => {
  const group = getGroupById(groupId);
  if (!group) return [];

  const descendants = [];
  const childGroups = getChildGroupsOfGroup(groupId);

  for (const child of childGroups) {
    descendants.push(child.id);
    // Recursively get descendants of this child
    const childDescendants = getAllDescendantGroupIds(child.id);
    descendants.push(...childDescendants);
  }

  return descendants;
};

// Get aggregated member count for a group (including all descendants)
export const getAggregatedMemberCount = (groupId) => {
  const group = getGroupById(groupId);
  if (!group) return 0;

  // Get all descendant group IDs
  const descendantGroupIds = getAllDescendantGroupIds(groupId);

  // Collect all member IDs from current group and descendants
  const allMemberIds = new Set();

  // Add members from current group
  group.memberPersonIds.forEach(id => allMemberIds.add(id));

  // Add members from all descendant groups
  descendantGroupIds.forEach(descendantId => {
    const descendantGroup = getGroupById(descendantId);
    if (descendantGroup) {
      descendantGroup.memberPersonIds.forEach(id => allMemberIds.add(id));
    }
  });

  // Return deduplicated count
  return allMemberIds.size;
};
