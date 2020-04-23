"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const checkers_common_1 = require("../checkers-common");
const governmentRequirements = [
    {
        name: 'Introductory Government Courses',
        description: 'Pass two of the introductory government courses in the subfields of American Government (AM), Comparative Politics (CP), Political Theory (PT), and International Relations (IR)',
        source: 'https://government.cornell.edu/sites/govt/files/Majorchecklist%202017_2018%20rv%20untrckd.pdf',
        checker: checkers_common_1.includesWithSingleRequirement('GOVT 1111', 'GOVT 1313', 'GOVT 1615', 'GOVT 1616', 'GOVT 1817', 'GOVT 1827'),
        fulfilledBy: 'courses',
        minCount: 2
    },
    {
        name: 'Government Coursework',
        description: 'Accumulate an additional 28 credits of government course work at the 2000-level or above.',
        source: 'https://government.cornell.edu/sites/govt/files/Majorchecklist%202017_2018%20rv%20untrckd.pdf',
        checker: checkers_common_1.includesWithSingleRequirement('GOVT 2***'),
        fulfilledBy: 'credits',
        minCount: 28
    },
    {
        name: 'Tenth Government Course',
        description: 'The tenth GOVT course: must be worth a minimum of three credits, can be taken at any level. First-Year Writing Seminars cannot be used.',
        source: 'https://government.cornell.edu/sites/govt/files/Majorchecklist%202017_2018%20rv%20untrckd.pdf',
        checker: checkers_common_1.includesWithSingleRequirement('GOVT ****'),
        fulfilledBy: 'credits',
        minCount: 3
    },
    {
        name: 'Government Seminar',
        description: 'At least one of the GOVT courses listed in items II or III above must be a 4000-level seminar '
            + '(i.e. a course with 15 or fewer students, taught by a GOVT professor, and typically requiring a research paper).',
        source: 'https://government.cornell.edu/sites/govt/files/Majorchecklist%202017_2018%20rv%20untrckd.pdf',
        checker: null,
        fulfilledBy: 'self-check'
    }
];
exports.default = governmentRequirements;
