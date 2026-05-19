import { useState } from 'react';
import CoupleCard from './CoupleCard';
import AddPersonCard from './AddPersonCard';
import AddParentsCard from './AddParentsCard';
import { familyTreeData } from './mockFamilyData';
import { useUser } from '../../contexts/UserContext';

// Helper function to filter tree data based on user's tree size
function getTreeDataBySize(treeSize) {
  if (treeSize < 2) {
    // Empty: only current person (just husband, no spouse)
    return {
      currentPerson: {
        husband: familyTreeData.currentPerson.husband,
        wife: null,
        marriage: null
      },
      showAddParents: true,
      showAddChild: true
    };
  } else if (treeSize < 100) {
    // Sparse: current person + some parents (2-3 generations)
    return {
      currentPerson: familyTreeData.currentPerson,
      children: familyTreeData.children,
      husbandParents: familyTreeData.husbandParents,
      wifeParents: null, // Missing wife's parents for sparse tree
      showAddParents: true
    };
  } else {
    // Full: everything (4+ generations)
    return familyTreeData;
  }
}

export default function FamilyTreePage({ onPersonClick, mobileMode = false }) {
  const { user } = useUser();
  const [viewMode, setViewMode] = useState('landscape');
  const baseUrl = import.meta.env.BASE_URL;

  // Get filtered tree data based on user's tree size
  const treeData = getTreeDataBySize(user.treeSize);

  return (
    <div className="h-full flex flex-col bg-gray-200 relative">
      {/* Desktop Toolbar - Hidden on mobile */}
      {!mobileMode && (
        <div className="absolute top-4 right-4 z-10 flex items-center gap-3 bg-white border border-gray-300 rounded-full shadow-sm px-2 py-1">
          {/* Group 1: View Mode Selector */}
          <button className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 rounded-full">
            <img src={`${baseUrl}icons/TreePedigree.svg`} alt="Tree Pedigree" className="w-5 h-5" />
            <span className="text-sm font-medium">LANDSCAPE</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Group 2: Navigation Controls */}
          <div className="flex items-center">
            <button className="p-2 hover:bg-gray-50 rounded-full">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>

            <button className="p-2 hover:bg-gray-50 rounded-full">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </button>

            <button className="p-2 hover:bg-gray-50 rounded-full">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
            </button>

            <button className="p-2 hover:bg-gray-50 rounded-full">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" strokeWidth={2} />
                <circle cx="12" cy="12" r="6" strokeWidth={2} />
                <circle cx="12" cy="12" r="2" strokeWidth={2} />
              </svg>
            </button>
          </div>

          {/* Group 3: Zoom Controls */}
          <div className="flex items-center">
            <button className="p-2 hover:bg-gray-50 rounded-full">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
            </button>

            <button className="p-2 hover:bg-gray-50 rounded-full">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Mobile Tree Controls - Top Right */}
      {mobileMode && (
        <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
          {/* Icon Buttons Pill */}
          <div className="flex items-center bg-white border border-gray-300 rounded-full shadow-sm px-2 py-1">
            <button className="p-2 hover:bg-gray-50 rounded-full">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>

            <button className="p-2 hover:bg-gray-50 rounded-full">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </button>

            <button className="p-2 hover:bg-gray-50 rounded-full">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
            </button>

            <button className="p-2 hover:bg-gray-50 rounded-full">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" strokeWidth={2} />
                <circle cx="12" cy="12" r="6" strokeWidth={2} />
                <circle cx="12" cy="12" r="2" strokeWidth={2} />
              </svg>
            </button>
          </div>

          {/* View Mode Selector Pill */}
          <div className="bg-white border border-gray-300 rounded-full shadow-sm px-2 py-1">
            <button className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 rounded-full">
              <img src={`${baseUrl}icons/TreePedigree.svg`} alt="Tree Pedigree" className="w-5 h-5" />
              <span className="text-sm font-medium">LANDSCAPE</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Tree Canvas - Scrollable */}
      <div className="flex-1 overflow-auto p-4 md:p-16 flex items-center">
        <div className="flex items-center min-w-max">
          {/* Column 0: Add Child (for empty trees) */}
          {treeData.showAddChild && (
            <>
              <div className="flex flex-col relative">
                <AddPersonCard type="child" onClick={() => console.log('Add child clicked')} />
              </div>
              {/* Connection line from child to current person */}
              <div className="relative self-stretch" style={{ width: '128px' }}>
                <div className="absolute bg-gray-400" style={{ width: '128px', height: '2px', left: '0', top: '50%', transform: 'translateY(-1px)' }}></div>
              </div>
            </>
          )}

          {/* Column 1: Current Person */}
          <div className="flex flex-col relative">
            <CoupleCard
              husband={treeData.currentPerson.husband}
              wife={treeData.currentPerson.wife}
              marriage={treeData.currentPerson.marriage}
              hasChildren={false}
              showNavigation={false}
              onPersonClick={onPersonClick}
            />
          </div>

          {/* Connection from Current Person to Parents - Show if any parents exist OR if we should show add parents */}
          {(treeData.husbandParents || treeData.wifeParents || treeData.showAddParents) && (
            <>
              <div className="relative self-stretch" style={{ width: '128px' }}>
                {/* Horizontal line from current person left edge to junction */}
                <div className="absolute bg-gray-400" style={{ width: '64px', height: '2px', left: '0', top: '50%', transform: 'translateY(-1px)' }}></div>
                {/* Vertical junction line connecting to both parents */}
                <div className="absolute bg-gray-400" style={{ width: '2px', left: '64px', top: '25%', height: '50%' }}></div>
                {/* Horizontal lines from junction to each parent */}
                <div className="absolute bg-gray-400" style={{ width: '64px', height: '2px', left: '64px', top: '25%', transform: 'translateY(-1px)' }}></div>
                <div className="absolute bg-gray-400" style={{ width: '64px', height: '2px', left: '64px', top: '75%', transform: 'translateY(-1px)' }}></div>
              </div>

              {/* Column 2: Parents */}
              <div className="flex flex-col gap-32 relative">
                {treeData.husbandParents ? (
                  <CoupleCard
                    husband={treeData.husbandParents.husband}
                    wife={treeData.husbandParents.wife}
                    marriage={treeData.husbandParents.marriage}
                    hasChildren={false}
                    showNavigation={false}
                    onPersonClick={onPersonClick}
                  />
                ) : (
                  <AddParentsCard onClick={() => console.log('Add husband parents clicked')} />
                )}
                {treeData.wifeParents ? (
                  <CoupleCard
                    husband={treeData.wifeParents.husband}
                    wife={treeData.wifeParents.wife}
                    marriage={treeData.wifeParents.marriage}
                    hasChildren={false}
                    showNavigation={false}
                    onPersonClick={onPersonClick}
                  />
                ) : (
                  <AddParentsCard onClick={() => console.log('Add wife parents clicked')} />
                )}
              </div>
            </>
          )}

          {/* Connection from Parents to Grandparents - Only show if grandparents exist */}
          {treeData.husbandPaternalGrandparents && (
            <>
              <div className="relative self-stretch" style={{ width: '128px' }}>
                {/* Lines from husband's parents (top parent) to their parents */}
                {/* Horizontal line from parent to junction */}
                <div className="absolute bg-gray-400" style={{ width: '64px', height: '2px', left: '0', top: '25%', transform: 'translateY(-1px)' }}></div>
                {/* Vertical junction line for husband's parent */}
                <div className="absolute bg-gray-400" style={{ width: '2px', left: '64px', top: '12.5%', height: '25%' }}></div>
                {/* Horizontal lines to husband's grandparents */}
                <div className="absolute bg-gray-400" style={{ width: '64px', height: '2px', left: '64px', top: '12.5%', transform: 'translateY(-1px)' }}></div>
                <div className="absolute bg-gray-400" style={{ width: '64px', height: '2px', left: '64px', top: '37.5%', transform: 'translateY(-1px)' }}></div>

                {/* Lines from wife's parents (bottom parent) to their parents */}
                {/* Horizontal line from parent to junction */}
                <div className="absolute bg-gray-400" style={{ width: '64px', height: '2px', left: '0', top: '75%', transform: 'translateY(-1px)' }}></div>
                {/* Vertical junction line for wife's parent */}
                <div className="absolute bg-gray-400" style={{ width: '2px', left: '64px', top: '62.5%', height: '25%' }}></div>
                {/* Horizontal lines to wife's grandparents */}
                <div className="absolute bg-gray-400" style={{ width: '64px', height: '2px', left: '64px', top: '62.5%', transform: 'translateY(-1px)' }}></div>
                <div className="absolute bg-gray-400" style={{ width: '64px', height: '2px', left: '64px', top: '87.5%', transform: 'translateY(-1px)' }}></div>
              </div>

              {/* Column 3: Grandparents */}
              <div className="flex flex-col relative" style={{ gap: '0' }}>
                <div style={{ marginBottom: '48px' }}>
                  <CoupleCard
                    husband={treeData.husbandPaternalGrandparents.husband}
                    wife={treeData.husbandPaternalGrandparents.wife}
                    marriage={treeData.husbandPaternalGrandparents.marriage}
                    hasChildren={false}
                    showNavigation={true}
                    onPersonClick={onPersonClick}
                  />
                </div>
                <div style={{ marginBottom: '96px' }}>
                  <CoupleCard
                    husband={treeData.husbandMaternalGrandparents.husband}
                    wife={treeData.husbandMaternalGrandparents.wife}
                    marriage={treeData.husbandMaternalGrandparents.marriage}
                    hasChildren={false}
                    showNavigation={true}
                    onPersonClick={onPersonClick}
                  />
                </div>
                <div style={{ marginBottom: '48px' }}>
                  <CoupleCard
                    husband={treeData.wifePaternalGrandparents.husband}
                    wife={treeData.wifePaternalGrandparents.wife}
                    marriage={treeData.wifePaternalGrandparents.marriage}
                    hasChildren={false}
                    showNavigation={true}
                    onPersonClick={onPersonClick}
                  />
            </div>
            <div>
              <CoupleCard
                husband={treeData.wifeMaternalGrandparents.husband}
                wife={treeData.wifeMaternalGrandparents.wife}
                marriage={treeData.wifeMaternalGrandparents.marriage}
                hasChildren={false}
                showNavigation={true}
                onPersonClick={onPersonClick}
              />
            </div>
          </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
