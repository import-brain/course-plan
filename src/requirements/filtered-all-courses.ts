/**
 * The module that re-exposes all jsons with strict static types.
 */

import { readFileSync, readdirSync } from 'fs';
import { Course } from './types';


function typeToOrderedNumber(type: string): number {
  switch(type) {
    case 'WI':
      return 0;
    case 'SP':
      return 1;
    case 'SU':
      return 2;
    case 'FA':
      return 3;
    default:
      return 4;
  }
}

function compareFilteredCoursesPaths(filteredCoursesPath1: string, filteredCoursesPath2: string): number {
  // Extract just the roster part in the filteredCoursesPath
  const roster1 = filteredCoursesPath1.split('-')[1];
  const roster2 = filteredCoursesPath2.split('-')[1];
  let type1 = roster1.slice(0,2);
  let year1 = roster1.slice(2);
  let type2 = roster2.slice(0, 2);
  let year2 = roster2.slice(2);

  if (year1 < year2) {
    // roster1 has less recent year than roster2
    return -1;
  } else if (year2 < year1) {
    // roster2 has less recent year than roster1
    return 1;
  } else if (typeToOrderedNumber(type1) < typeToOrderedNumber(type2)) {
    // roster1 has less recent semester type than roster2
    return -1;
  } else if (typeToOrderedNumber(type2) < typeToOrderedNumber(type1)) {
    // roster2 has less recent semester type than roster1
    return 1;
  } else {
    return 0;
  }
}

function sortByLeastRecentRosters(filteredCoursesPaths: string[]): string[] {
  // Sorts from least recent roster
  return filteredCoursesPaths.sort(compareFilteredCoursesPaths);
}


/** All paths to the filtered-<semester name>-courses.json files.
 * Sorted by least recent rosters
 */
const filteredCoursesPaths: string[] = sortByLeastRecentRosters(
  readdirSync('src/requirements/').filter(
    path => path.includes('filtered') && path.includes('courses.json')
  )
);

// NOTE:
//   We need to use the type cast trick here,
//   because TypeScript has limited capability to correctly infer types of deeply nested json with enums.

/** All courses fetch from Cornell Class API, with only the fields we need.
 * First read and parse each JSON file using type cast trick.
 * Then reduce to one JSON object
*/
const filteredAllCourses: { readonly [semester: string]: readonly Course[] } = (
  filteredCoursesPaths.map(path => JSON.parse(readFileSync('src/requirements/' + path).toString()))
                      .reduce((accum, currentValue) => Object.assign(accum, currentValue))
);

export default filteredAllCourses;
