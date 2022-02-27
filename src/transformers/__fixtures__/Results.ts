export default {
  ranges: {
    took: 0.32113,
    timed_out: false,
    _shards: {
      total: 5,
      successful: 5,
      skipped: 0,
      failed: 0,
    },
    hits: {
      total: 5,
      max_score: 1,
      hits: [
        {
          _index: 'incidents',
          _type: 'incident',
          _id: '5ae70e76b6d0051480f02edf',
          _score: 1,
          _source: {
            status: 'Submitted',
            type: {
              type: 'Incident affecting Patient',
              subType: '[Sub-type]',
              category: 'Breach of 52 week pathway',
            },
          },
        },
      ],
    },
    aggregations: {
      'involved.type': {
        doc_count_error_upper_bound: 0,
        sum_other_doc_count: 0,
        buckets: [
          {
            key: 'Patient',
            doc_count: 6,
          },
          {
            key: 'Employee/Member of staff',
            doc_count: 3,
          },
        ],
      },
      'involved.role': {
        doc_count_error_upper_bound: 0,
        sum_other_doc_count: 0,
        buckets: [
          {
            key: 'Victim (Violence and Agression)',
            doc_count: 9,
          },
        ],
      },
      'min_when.when': {
        value: 1522764180036,
        value_as_string: '2018-04-03T14:03:00.036Z',
      },
      'max_slipsTripsFallsAndCollisions.fallsLastYear': {
        value: 8,
      },
      'min_slipsTripsFallsAndCollisions.fallsLastYear': {
        value: 1,
      },
      'max_when.when': {
        value: 1525349397322,
        value_as_string: '2018-05-03T12:09:57.322Z',
      },
      'results.predictor.xdr': {
        doc_count_error_upper_bound: 0,
        sum_other_doc_count: 0,
        buckets: [
          {
            key: 0,
            key_as_string: 'false',
            doc_count: 8,
          },
        ],
      },
      'results.predictor.mdr': {
        doc_count_error_upper_bound: 0,
        sum_other_doc_count: 0,
        buckets: [
          {
            key: 1,
            key_as_string: 'true',
            doc_count: 8,
          },
        ],
      },
    },
  },
  rangesWithFromTo: {
    took: 0.32113,
    timed_out: false,
    _shards: {
      total: 5,
      successful: 5,
      skipped: 0,
      failed: 0,
    },
    hits: {
      total: 5,
      max_score: 1,
      hits: [
        {
          _index: 'incidents',
          _type: 'incident',
          _id: '5ae70e76b6d0051480f02edf',
          _score: 1,
          _source: {
            status: 'Submitted',
            type: {
              type: 'Incident affecting Patient',
              subType: '[Sub-type]',
              category: 'Breach of 52 week pathway',
            },
          },
        },
      ],
    },
    aggregations: {
      'involved.type': {
        doc_count_error_upper_bound: 0,
        sum_other_doc_count: 0,
        buckets: [
          {
            key: 'Patient',
            doc_count: 6,
          },
          {
            key: 'Employee/Member of staff',
            doc_count: 3,
          },
        ],
      },
      'involved.role': {
        doc_count_error_upper_bound: 0,
        sum_other_doc_count: 0,
        buckets: [
          {
            key: 'Victim (Violence and Agression)',
            doc_count: 9,
          },
        ],
      },
      'min_when.when': {
        value: 1522764180036,
        value_as_string: '2018-04-03T14:03:00.036Z',
      },
      'max_slipsTripsFallsAndCollisions.fallsLastYear': {
        value: 8,
      },
      'min_slipsTripsFallsAndCollisions.fallsLastYear': {
        value: 1,
      },
      'max_when.when': {
        value: 1525349397322,
        value_as_string: '2018-05-03T12:09:57.322Z',
      },
      'results.predictor.xdr': {
        doc_count_error_upper_bound: 0,
        sum_other_doc_count: 0,
        buckets: [
          {
            key: 0,
            key_as_string: 'false',
            doc_count: 8,
          },
        ],
      },
      'results.predictor.mdr': {
        doc_count_error_upper_bound: 0,
        sum_other_doc_count: 0,
        buckets: [
          {
            key: 1,
            key_as_string: 'true',
            doc_count: 8,
          },
        ],
      },
      readingTimeMinutes: {
        buckets: [
          {
            key: '*-5.0',
            to: 5.0,
            doc_count: 0,
          },
          {
            key: '5.0-10.0',
            from: 5.0,
            to: 10.0,
            doc_count: 0,
          },
          {
            key: '10.0-*',
            from: 10.0,
            doc_count: 0,
          },
        ],
      },
    },
  },
  rangesNoBuckets: {
    took: 1,
    timed_out: false,
    _shards: {
      total: 5,
      successful: 5,
      skipped: 0,
      failed: 0,
    },
    hits: {
      total: 5,
      max_score: 1,
      hits: [
        {
          _index: 'incidents',
          _type: 'incident',
          _id: '5ae70e76b6d0051480f02edf',
          _score: 1,
          _source: {
            status: 'Submitted',
            type: {
              type: 'Incident affecting Patient',
              subType: '[Sub-type]',
              category: 'Breach of 52 week pathway',
            },
          },
        },
      ],
    },
    aggregations: {
      'involved.type': {
        doc_count_error_upper_bound: 0,
        sum_other_doc_count: 0,
      },
      'involved.role': {
        doc_count_error_upper_bound: 0,
        sum_other_doc_count: 0,
      },
      'min_when.when': {
        value: 1522764180036,
        value_as_string: '2018-04-03T14:03:00.036Z',
      },
      'max_slipsTripsFallsAndCollisions.fallsLastYear': {
        value: 8,
      },
      'min_slipsTripsFallsAndCollisions.fallsLastYear': {
        value: 1,
      },
      'max_when.when': {
        value: 1525349397322,
        value_as_string: '2018-05-03T12:09:57.322Z',
      },
    },
  },
  rangesV7: {
    took: 0.32113,
    timed_out: false,
    _shards: {
      total: 5,
      successful: 5,
      skipped: 0,
      failed: 0,
    },
    hits: {
      total: {
        value: 5,
        relation: 'eq',
      },
      max_score: 1,
      hits: [
        {
          _index: 'incidents',
          _type: 'incident',
          _id: '5ae70e76b6d0051480f02edf',
          _score: 1,
          _source: {
            status: 'Submitted',
            type: {
              type: 'Incident affecting Patient',
              subType: '[Sub-type]',
              category: 'Breach of 52 week pathway',
            },
          },
        },
      ],
    },
    aggregations: {
      'involved.type': {
        doc_count_error_upper_bound: 0,
        sum_other_doc_count: 0,
        buckets: [
          {
            key: 'Patient',
            doc_count: 6,
          },
          {
            key: 'Employee/Member of staff',
            doc_count: 3,
          },
        ],
      },
      'involved.role': {
        doc_count_error_upper_bound: 0,
        sum_other_doc_count: 0,
        buckets: [
          {
            key: 'Victim (Violence and Agression)',
            doc_count: 9,
          },
        ],
      },
      'min_when.when': {
        value: 1522764180036,
        value_as_string: '2018-04-03T14:03:00.036Z',
      },
      'max_slipsTripsFallsAndCollisions.fallsLastYear': {
        value: 8,
      },
      'min_slipsTripsFallsAndCollisions.fallsLastYear': {
        value: 1,
      },
      'max_when.when': {
        value: 1525349397322,
        value_as_string: '2018-05-03T12:09:57.322Z',
      },
      'results.predictor.xdr': {
        doc_count_error_upper_bound: 0,
        sum_other_doc_count: 0,
        buckets: [
          {
            key: 0,
            key_as_string: 'false',
            doc_count: 8,
          },
        ],
      },
      'results.predictor.mdr': {
        doc_count_error_upper_bound: 0,
        sum_other_doc_count: 0,
        buckets: [
          {
            key: 1,
            key_as_string: 'true',
            doc_count: 8,
          },
        ],
      },
    },
  },
  results0: {
    took: 0.32113,
    timed_out: false,
    _shards: {
      total: 5,
      successful: 5,
      skipped: 0,
      failed: 0,
    },
    hits: {
      total: {
        value: 0,
        relation: 'eq',
      },
      max_score: 1,
      hits: [],
    },
  },
  nestedAggregations: {
    took: 166,
    timed_out: false,
    _shards: {
      total: 1,
      successful: 1,
      skipped: 0,
      failed: 0,
    },
    hits: {
      total: {
        value: 46,
        relation: 'eq',
      },
      max_score: null,
      hits: [],
    },
    aggregations: {
      'max_when.when': {
        value: null,
      },
      specialty: {
        doc_count: 46,
        specialty: {
          doc_count_error_upper_bound: 0,
          sum_other_doc_count: 0,
          buckets: [
            {
              key: 'Hepatobiliary Surgery',
              doc_count: 2,
            },
            {
              key: 'Information Governance',
              doc_count: 2,
            },
            {
              key: 'Pathology',
              doc_count: 2,
            },
            {
              key: 'Acute Medicine (SMH).',
              doc_count: 1,
            },
            {
              key: 'Anaesthetics',
              doc_count: 1,
            },
            {
              key: 'Cancer Performance',
              doc_count: 1,
            },
            {
              key: 'Cancer Performance and Improvement',
              doc_count: 1,
            },
            {
              key: 'Cardiac Surgery',
              doc_count: 1,
            },
            {
              key: 'Clinical Strategy Implementation Programme',
              doc_count: 1,
            },
            {
              key: 'Colposcopy',
              doc_count: 1,
            },
            {
              key: 'Communications',
              doc_count: 1,
            },
            {
              key: 'Computerised Tomography (CT)',
              doc_count: 1,
            },
            {
              key: 'Corporate Governance',
              doc_count: 1,
            },
            {
              key: 'Estates Projects',
              doc_count: 1,
            },
            {
              key: 'Facilities',
              doc_count: 1,
            },
            {
              key: 'Fire Safety',
              doc_count: 1,
            },
            {
              key: 'Gastroenterology',
              doc_count: 1,
            },
            {
              key: 'Gastroenterology.',
              doc_count: 1,
            },
            {
              key: 'HR Operations and Resourcing',
              doc_count: 1,
            },
            {
              key: 'ICT Corporate Risks',
              doc_count: 1,
            },
            {
              key: 'ICT Projects',
              doc_count: 1,
            },
            {
              key: 'Improvement Team',
              doc_count: 1,
            },
            {
              key: 'In Vitro Fertilisation (IVF)',
              doc_count: 1,
            },
            {
              key: 'Information & Communications Technology',
              doc_count: 1,
            },
            {
              key: 'Magnetic Resonance Imaging (MRI)',
              doc_count: 1,
            },
            {
              key: 'Marketing and communications',
              doc_count: 1,
            },
            {
              key: 'Neurophysiology',
              doc_count: 1,
            },
            {
              key: 'Nursing and midwifery education',
              doc_count: 1,
            },
            {
              key: 'Occupational Health and Safety',
              doc_count: 1,
            },
            {
              key: 'Occupational Therapy',
              doc_count: 1,
            },
            {
              key: 'Palliative Care',
              doc_count: 1,
            },
            {
              key: 'Payments',
              doc_count: 1,
            },
            {
              key: 'People & Organisational Development',
              doc_count: 1,
            },
            {
              key: 'Plain Film',
              doc_count: 1,
            },
            {
              key: 'Plastics',
              doc_count: 1,
            },
            {
              key: 'Primary Care',
              doc_count: 1,
            },
            {
              key: 'Receivable',
              doc_count: 1,
            },
            {
              key: 'Research',
              doc_count: 1,
            },
            {
              key: 'Safety',
              doc_count: 1,
            },
            {
              key: 'Safety & Effectiveness',
              doc_count: 1,
            },
            {
              key: 'Stakeholder Management',
              doc_count: 1,
            },
            {
              key: 'Talent',
              doc_count: 1,
            },
            {
              key: 'Ultrasound (Imaging)',
              doc_count: 1,
            },
          ],
        },
      },
      involved: {
        doc_count: 108,
        role: {
          doc_count_error_upper_bound: 0,
          sum_other_doc_count: 2,
          buckets: [
            {
              key: 'Trust Solicitor',
              doc_count: 9,
            },
            {
              key: 'Complainant',
              doc_count: 7,
            },
            {
              key: 'Member of staff responsible for patient care',
              doc_count: 7,
            },
            {
              key: 'Patient',
              doc_count: 7,
            },
            {
              key: 'Witness',
              doc_count: 7,
            },
            {
              key: 'Member of staff directly involved',
              doc_count: 6,
            },
            {
              key: "Patient's Advocate",
              doc_count: 6,
            },
            {
              key: 'Reporter',
              doc_count: 6,
            },
            {
              key: 'Support Investigator',
              doc_count: 6,
            },
            {
              key: 'Investigation Lead',
              doc_count: 5,
            },
            {
              key: 'Person Injured/Affected',
              doc_count: 5,
            },
            {
              key: 'Police Officer in Attendance',
              doc_count: 5,
            },
            {
              key: 'Victim (Violence and Aggression)',
              doc_count: 5,
            },
            {
              key: 'Other role',
              doc_count: 4,
            },
            {
              key: 'PALS Enquirer',
              doc_count: 4,
            },
            {
              key: "Patient's Solicitor",
              doc_count: 4,
            },
            {
              key: 'Standard Lead',
              doc_count: 4,
            },
            {
              key: 'Claimant',
              doc_count: 3,
            },
            {
              key: "Coroner / Coroner's Officer",
              doc_count: 3,
            },
            {
              key: 'Perpetrator (Violence and Aggression)',
              doc_count: 3,
            },
          ],
        },
        gender: {
          doc_count_error_upper_bound: 0,
          sum_other_doc_count: 0,
          buckets: [
            {
              key: 'Male',
              doc_count: 37,
            },
            {
              key: 'Not stated / unknown',
              doc_count: 36,
            },
            {
              key: 'Female',
              doc_count: 35,
            },
          ],
        },
        personType: {
          doc_count_error_upper_bound: 0,
          sum_other_doc_count: 0,
          buckets: [
            {
              key: 'Legal',
              doc_count: 16,
            },
            {
              key: 'Emergency Service Personnel (Non-Healthcare)',
              doc_count: 13,
            },
            {
              key: 'Other Type of Contact',
              doc_count: 13,
            },
            {
              key: 'Relative/Friend/Advocate of Patient',
              doc_count: 12,
            },
            {
              key: 'Contractor',
              doc_count: 11,
            },
            {
              key: 'Other Health/Social Care Professional',
              doc_count: 11,
            },
            {
              key: 'Employee/Member of Staff',
              doc_count: 9,
            },
            {
              key: 'Member of Public',
              doc_count: 9,
            },
            {
              key: 'Patient',
              doc_count: 7,
            },
            {
              key: 'Visitor',
              doc_count: 7,
            },
          ],
        },
      },
      harm: {
        doc_count: 46,
        result: {
          doc_count_error_upper_bound: 0,
          sum_other_doc_count: 0,
          buckets: [
            {
              key: 'Psychological harm',
              doc_count: 17,
            },
            {
              key: 'Near Miss',
              doc_count: 11,
            },
            {
              key: 'No harm',
              doc_count: 10,
            },
            {
              key: 'Harm',
              doc_count: 8,
            },
          ],
        },
        actualImpact: {
          doc_count_error_upper_bound: 0,
          sum_other_doc_count: 0,
          buckets: [
            {
              key: 'Death',
              doc_count: 10,
            },
            {
              key: 'Major harm',
              doc_count: 8,
            },
            {
              key: 'Near Miss',
              doc_count: 8,
            },
            {
              key: 'No harm',
              doc_count: 8,
            },
            {
              key: 'Moderate harm',
              doc_count: 7,
            },
            {
              key: 'Low harm',
              doc_count: 5,
            },
          ],
        },
      },
      where: {
        doc_count: 46,
        site: {
          doc_count_error_upper_bound: 0,
          sum_other_doc_count: 0,
          buckets: [
            {
              key: 'SMH',
              doc_count: 46,
            },
          ],
        },
      },
      type: {
        doc_count: 46,
        subCategory: {
          doc_count_error_upper_bound: 0,
          sum_other_doc_count: 0,
          buckets: [
            {
              key: 'Bereavement',
              doc_count: 6,
            },
            {
              key: 'Patient admitted to Trust with pressure ulcer',
              doc_count: 6,
            },
            {
              key: 'Increased / abnormal workload',
              doc_count: 5,
            },
            {
              key: 'Unable to access Palliative Care Team',
              doc_count: 5,
            },
            {
              key: 'Admitted to Trust with injuries',
              doc_count: 4,
            },
            {
              key: 'Inappropriate disposal of waste',
              doc_count: 4,
            },
            {
              key: 'Error on release documentation',
              doc_count: 3,
            },
            {
              key: 'Expected Cardiac Arrest',
              doc_count: 3,
            },
            {
              key: 'Bomb threat or warning',
              doc_count: 2,
            },
            {
              key: 'Delayed medication',
              doc_count: 2,
            },
            {
              key: 'Missed diagnosis',
              doc_count: 2,
            },
            {
              key: 'Misuse of Internet or other IT facilities',
              doc_count: 2,
            },
            {
              key: 'Collapse',
              doc_count: 1,
            },
            {
              key: 'Extraction',
              doc_count: 1,
            },
          ],
        },
        category: {
          doc_count_error_upper_bound: 0,
          sum_other_doc_count: 0,
          buckets: [
            {
              key: 'End of Life Care',
              doc_count: 11,
            },
            {
              key: 'Pressure Ulcer',
              doc_count: 6,
            },
            {
              key: 'Environmental Matters',
              doc_count: 5,
            },
            {
              key: 'Infrastructure',
              doc_count: 5,
            },
            {
              key: 'Admission',
              doc_count: 4,
            },
            {
              key: 'Cardiac Arrest',
              doc_count: 3,
            },
            {
              key: 'Deceased Patients',
              doc_count: 3,
            },
            {
              key: 'Diagnosis',
              doc_count: 2,
            },
            {
              key: 'Information and Communication Technology',
              doc_count: 2,
            },
            {
              key: 'Medication',
              doc_count: 2,
            },
            {
              key: 'Security',
              doc_count: 2,
            },
            {
              key: 'Staff Abuse',
              doc_count: 1,
            },
          ],
        },
        type: {
          doc_count_error_upper_bound: 0,
          sum_other_doc_count: 0,
          buckets: [
            {
              key: 'PAT',
              doc_count: 31,
            },
            {
              key: 'STAFF',
              doc_count: 15,
            },
          ],
        },
      },
      status: {
        doc_count_error_upper_bound: 0,
        sum_other_doc_count: 0,
        buckets: [
          {
            key: 'Submitted',
            doc_count: 15,
          },
          {
            key: 'Under Review',
            doc_count: 13,
          },
          {
            key: 'Draft',
            doc_count: 9,
          },
          {
            key: 'Reviewed',
            doc_count: 9,
          },
        ],
      },
    },
  },
};
