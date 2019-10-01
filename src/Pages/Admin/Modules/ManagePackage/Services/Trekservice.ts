import { common } from '@/Pages/Admin/Modules/Common/Services/Common.ts';
import { trekapi } from '@/Pages/Admin/Modules/ManagePackage/Services/Trekapi';


class TrekService {

  public async AddTrek(payLoad: object): Promise<any> {
    return await new Promise((resolve, reject) => {
      common
        .callApi1('post', trekapi.AddTrek(), payLoad)
        .then((res: any) => {
          // console.log(res);
          resolve(res);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }
  // Package List API
  public async PackageList(payLoad: object): Promise<any> {
        return await new Promise((resolve, reject) => {
          common
            .callApi1('post', trekapi.PackageList(), payLoad)
            .then((res: any) => {
              // console.log(res);
              resolve(res);
            })
            .catch((error: any) => {
              reject(error);
            });
        });
  }
  public async getTourTypeList(): Promise<any> {
    return await new Promise((resolve, reject) => {
      common
        .callApi1('get', trekapi.TourTypeList())
        .then((res: any) => {
          // console.log(res);
          resolve(res);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }
  public async getDifficultyLevelList(): Promise<any> {
    return await new Promise((resolve, reject) => {
      common
        .callApi1('get', trekapi.DifficultyLevelList())
        .then((res: any) => {
          // console.log(res);
          resolve(res);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }
  public async getAttractionType(): Promise<any> {
    return await new Promise((resolve, reject) => {
      common
        .callApi1('get', trekapi.GetAttractionType())
        .then((res: any) => {
          // console.log(res);
          resolve(res);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }
  public async getTrek(): Promise<any> {
    return await new Promise((resolve, reject) => {
      common
        .callApi1('get', trekapi.GetTrek())
        .then((res: any) => {
          // console.log(res);
          resolve(res);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }
  // General Tab All Data API
  public async getGeneralTabData(payLoad: any): Promise<any> {
        return await new Promise((resolve, reject) => {
          common
            .callApi1('post', trekapi.GetGeneral(), payLoad)
            .then((res: any) => {
              // console.log(res);
              resolve(res);
            })
            .catch((error: any) => {
              reject(error);
            });
        });
  }
  // General Tab Put API
  public async PutGeneral(payLoad: any): Promise<any> {
        return await new Promise((resolve, reject) => {
          // console.log("Put General", payLoad.trek_id);
          common
            .callApi1('put', trekapi.PutGeneral(payLoad.trek_id), payLoad)
            .then((res: any) => {
              // console.log(res);
              resolve(res);
            })
            .catch((error: any) => {
              reject(error);
            });
        });
  }

  public async getPricingBasis(): Promise<any> {
    return await new Promise((resolve, reject) => {
      common
        .callApi1('get', trekapi.GetPricingBasis())
        .then((res: any) => {
          // console.log(res);
          resolve(res);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }
  public async getPriceDuration(payLoad: any): Promise<any> {
    return await new Promise((resolve, reject) => {
      common
        .callApi1('post', trekapi.GetPriceDuration(), payLoad)
        .then((res: any) => {
          // console.log(res);
          resolve(res);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }
  public async getSeasons(): Promise<any> {
    return await new Promise((resolve, reject) => {
      common
        .callApi1('get', trekapi.GetSeasons())
        .then((res: any) => {
          // console.log(res);
          resolve(res);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }
  // Price Tab Put API
  public async editPrice(payLoad: any): Promise<any> {
    return await new Promise((resolve, reject) => {
      // console.log("Put General", payLoad.trek_id);
      common
        .callApi1('put', trekapi.EditPrice(payLoad.trek_id), payLoad)
        .then((res: any) => {
          // console.log(res);
          resolve(res);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
}
  // Notes Tab Put API
  public async editNotesGeneral(payLoad: any): Promise<any> {
    return await new Promise((resolve, reject) => {
      // console.log("Put General", payLoad.trek_id);
      common
        .callApi1('post', trekapi.EditNotesGeneral(payLoad.trek_id), payLoad)
        .then((res: any) => {
          // console.log(res);
          resolve(res);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
}
  // Notes Tab Put API
  public async addHighlight(payLoad: any): Promise<any> {
    return await new Promise((resolve, reject) => {
      // console.log("Put General", payLoad.trek_id);
      common
        .callApi1('post', trekapi.AddHighlight(payLoad.trek_id), payLoad)
        .then((res: any) => {
          // console.log(res);
          resolve(res);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
}
public async getIconsList(): Promise<any> {
  return await new Promise((resolve, reject) => {
    common
      .callApi1('get', trekapi.GetIcons())
      .then((res: any) => {
        // console.log(res);
        resolve(res);
      })
      .catch((error: any) => {
        reject(error);
      });
  });
}


public async getHighlightList(payLoad: any): Promise<any> {
  return await new Promise((resolve, reject) => {
    common
      .callApi1('post', trekapi.GetHighlight(), payLoad)
      .then((res: any) => {
        // console.log(res.data.data);
        resolve(res);
      })
      .catch((error: any) => {
        reject(error);
      });
  });
}
public async deleteHighlight(payLoad: any) {
  return await new Promise((resolve, reject) => {
    common
      .callApi1("post", trekapi.DeleteHighlight(payLoad.trek_id), payLoad)
      .then((res: any) => {
        resolve(res);
      })
      .catch((err: any) => {
        reject(err);
      });
  });
}
public async editHighlight(data: any) {
  return await new Promise((resolve, reject) => {
    common
      .callApi1("put", trekapi.EditHighlight(), data)
      .then((res: any) => {
        resolve(res);
      })
      .catch((err: any) => {
        reject(err);
      });
  });
}

// public async getDestinationList(): Promise<any> {
//   // console.log(payLoad.trek_id);
//   return await new Promise((resolve, reject) => {
//     common
//       .callApi1('get', trekapi.DestinationList())
//       .then((res: any) => {
//         // console.log(res);
//         resolve(res);
//       })
//       .catch((error: any) => {
//         reject(error);
//       });
//   });
// }
// Price Tab List
public async pricingList(payLoad: any): Promise<any> {
  return await new Promise((resolve, reject) => {
    common
      .callApi1('post', trekapi.PricingList(), payLoad)
      .then((res: any) => {
        // console.log(res);
        resolve(res);
      })
      .catch((error: any) => {
        reject(error);
      });
  });
}
// Price Tab Add
public async addPricing(payLoad: any): Promise<any> {
  return await new Promise((resolve, reject) => {
    common
      .callApi1('post', trekapi.AddPricing(), payLoad)
      .then((res: any) => {
        // console.log(res.data.data);
        resolve(res);
      })
      .catch((error: any) => {
        reject(error);
      });
  });
}
// Price Tab Edit
public async editPricing(data: any) {
  return await new Promise((resolve, reject) => {
    common
      .callApi1('put', trekapi.EditPricing(), data)
      .then((res: any) => {
        resolve(res);
      })
      .catch((err: any) => {
        reject(err);
      });
  });
}
// Price Tab Delete
public async deletePrice(payLoad: any): Promise<any> {
  return await new Promise((resolve, reject) => {
    common
      .callApi1('post', trekapi.DeletePrice(), payLoad)
      .then((res: any) => {
        console.log(res.data.data);
        resolve(res);
      })
      .catch((error: any) => {
        reject(error);
      });
  });
}
// Destination Tab
public async getDestinationsList(payLoad: any): Promise<any> {
  return await new Promise((resolve, reject) => {
    common
      .callApi1('post', trekapi.DestinationsList(), payLoad)
      .then((res: any) => {
        // console.log(res.data.data);
        resolve(res);
      })
      .catch((error: any) => {
        reject(error);
      });
  });
}
public async getMasterDestinationList(): Promise<any> {
  return await new Promise((resolve, reject) => {
    common
      .callApi1('get', trekapi.MasterDestinationList())
      .then((res: any) => {
        // console.log(res.data.data);
        resolve(res);
      })
      .catch((error: any) => {
        reject(error);
      });
  });
}
public async addDestination(payLoad: any): Promise<any> {
  return await new Promise((resolve, reject) => {
    common
      .callApi1('post', trekapi.AddDestination(payLoad.trek_id), payLoad)
      .then((res: any) => {
        // console.log(res);
        resolve(res);
      })
      .catch((error: any) => {
        reject(error);
      });
  });
}
public async editDestination(payLoad: any): Promise<any> {
  return await new Promise((resolve, reject) => {
    common
      .callApi1('put', trekapi.EditDestination(payLoad.trek_id), payLoad)
      .then((res: any) => {
        // console.log(res);
        console.log(payLoad);
        resolve(res);
      })
      .catch((error: any) => {
        reject(error);
      });
  });
}
public async deleteDestination(payLoad: any): Promise<any> {
  return await new Promise((resolve, reject) => {
    common
      .callApi1('post', trekapi.DeleteDestination(), payLoad)
      .then((res: any) => {
        // console.log(res);
        resolve(res);
      })
      .catch((error: any) => {
        reject(error);
      });
  });
}
public async allImageList(payLoad: any): Promise<any> {
  return await new Promise((resolve, reject) => {
    common
      .callApi1('post', trekapi.ImageList(), payLoad)
      .then((res: any) => {
        // console.log(res);
        resolve(res);
      })
      .catch((error: any) => {
        reject(error);
      });
  });
}

public async makeBannerImage(payLoad: any): Promise<any> {
  return await new Promise((resolve, reject) => {
    common
      .callApi1('put', trekapi.MakeBannerImage(), payLoad)
      .then((res: any) => {
        // console.log(res);
        // console.log(payLoad);
        resolve(res);
      })
      .catch((error: any) => {
        reject(error);
      });
  });
}
public async addGalleryImage(url: any, payLoad: any): Promise<any> {
  return await new Promise((resolve, reject) => {
    common
      .callApi1('post', url, payLoad)
      .then((res: any) => {
        // console.log(res);
        resolve(res);
      })
      .catch((error: any) => {
        reject(error);
      });
  });
}
public async deleteImage(payLoad: any): Promise<any> {
  return await new Promise((resolve, reject) => {
    common
      .callApi1('post', trekapi.DeleteImage(), payLoad)
      .then((res: any) => {
        // console.log(res);
        // console.log(payLoad);
        resolve(res);
      })
      .catch((error: any) => {
        reject(error);
      });
  });
}
public async retrieveItinerary(payLoad: any): Promise<any> {
  return await new Promise((resolve, reject) => {
    common
      .callApi1('post', trekapi.RetrieveItinerary(), payLoad)
      .then((res: any) => {
        // console.log(res);
        resolve(res);
      })
      .catch((error: any) => {
        reject(error);
      });
  });
}

// Itinerary Unit List

public async getUnitList(): Promise<any> {
  return await new Promise((resolve, reject) => {
    common
      .callApi1('get', trekapi.UnitList())
      .then((res: any) => {
        // console.log(res.data.data);
        resolve(res);
      })
      .catch((error: any) => {
        reject(error);
      });
  });
}
public async addAttraction(payLoad: any): Promise<any> {
  return await new Promise((resolve, reject) => {
    common
      .callApi1('post', trekapi.AddAttraction(), payLoad)
      .then((res: any) => {
        // console.log(res);
        resolve(res);
      })
      .catch((error: any) => {
        reject(error);
      });
  });
}
public async editAttraction(payLoad: any): Promise<any> {
  return await new Promise((resolve, reject) => {
    common
      .callApi1('put', trekapi.EditAttraction(), payLoad)
      .then((res: any) => {
        // console.log(res);
        // console.log(payLoad);
        resolve(res);
      })
      .catch((error: any) => {
        reject(error);
      });
  });
}
 // Add Segment
public async addSegment(payLoad: any): Promise<any> {
  return await new Promise((resolve, reject) => {
    common
      .callApi1('post', trekapi.AddSegment(payLoad.trek_id), payLoad)
      .then((res: any) => {
        // console.log(res);
        resolve(res);
      })
      .catch((error: any) => {
        reject(error);
      });
  });
}
 // Add Segment
public async deletSegment(payLoad: any): Promise<any> {
  return await new Promise((resolve, reject) => {
    common
      .callApi1('post', trekapi.DeletSegment(payLoad.trek_id), payLoad)
      .then((res: any) => {
        // console.log(res);
        resolve(res);
      })
      .catch((error: any) => {
        reject(error);
      });
  });
}
public async editSegment(payLoad: any): Promise<any> {
  return await new Promise((resolve, reject) => {
    common
      .callApi1('put', trekapi.EditSegment(payLoad.trek_id), payLoad)
      .then((res: any) => {
        // console.log(res);
        console.log(payLoad);
        resolve(res);
      })
      .catch((error: any) => {
        reject(error);
      });
  });
}
public async segmentImageList(payLoad: any): Promise<any> {
  return await new Promise((resolve, reject) => {
    common
      .callApi1('post', trekapi.SegmentImageList(payLoad.trek_id), payLoad)
      .then((res: any) => {
        // console.log(res);
        resolve(res);
      })
      .catch((error: any) => {
        reject(error);
      });
  });
}
public async segmentMakeDefaultImage(payLoad: any): Promise<any> {
  return await new Promise((resolve, reject) => {
    common
      .callApi1('put', trekapi.SegmentMakeDefaultImage(), payLoad)
      .then((res: any) => {
        // console.log(res);
        // console.log(payLoad);
        resolve(res);
      })
      .catch((error: any) => {
        reject(error);
      });
  });
}
public async segmentImageDelete(payLoad: any): Promise<any> {
  return await new Promise((resolve, reject) => {
    common
      .callApi1('post', trekapi.SegmentImageDelete(payLoad.trek_id), payLoad)
      .then((res: any) => {
        // console.log(res);
        resolve(res);
      })
      .catch((error: any) => {
        reject(error);
      });
  });
}
 // Attraction List Itinery List
public async getAttractionList(payLoad: any): Promise<any> {
  return await new Promise((resolve, reject) => {
    common
      .callApi1('post', trekapi.AttractionList(payLoad.trek_id), payLoad)
      .then((res: any) => {
        // console.log(res);
        resolve(res);
      })
      .catch((error: any) => {
        reject(error);
      });
  });
}
public async deleteSegmentAttraction(payLoad: any): Promise<any> {
  return await new Promise((resolve, reject) => {
    common
      .callApi1('post', trekapi.DeleteSegmentAttraction(payLoad.trek_id), payLoad)
      .then((res: any) => {
        // console.log(res);
        resolve(res);
      })
      .catch((error: any) => {
        reject(error);
      });
  });
}
public async deleteAttractionImage(payLoad: any): Promise<any> {
  return await new Promise((resolve, reject) => {
    common
      .callApi1('post', trekapi.DeleteAttractionImage(), payLoad)
      .then((res: any) => {
        // console.log(res);
        resolve(res);
      })
      .catch((error: any) => {
        reject(error);
      });
  });
}
// public async addAttractionImage(payLoad: any): Promise<any> {
//   return await new Promise((resolve, reject) => {
//     common
//       .callApi1('post', trekapi.AddAttractionImage(), payLoad)
//       .then((res: any) => {
//         // console.log(res);
//         resolve(res);
//       })
//       .catch((error: any) => {
//         reject(error);
//       });
//   });
// }
 // Includes List in Includes Tab
public async getIncludesList(payLoad: any): Promise<any> {
  return await new Promise((resolve, reject) => {
    common
      .callApi1('post', trekapi.IncludesList(payLoad.trek_id), payLoad)
      .then((res: any) => {
        // console.log(res);
        resolve(res);
      })
      .catch((error: any) => {
        reject(error);
      });
  });
}
public async addIncludes(payLoad: object): Promise<any> {
  return await new Promise((resolve, reject) => {
    common
      .callApi1('post', trekapi.AddIncludes(), payLoad)
      .then((res: any) => {
        // console.log(res);
        resolve(res);
      })
      .catch((error: any) => {
        reject(error);
      });
  });
}
public async editIncludes(payLoad: any): Promise<any> {
  return await new Promise((resolve, reject) => {
    common
      .callApi1('put', trekapi.EditIncludes(), payLoad)
      .then((res: any) => {
        // console.log(res);
        // console.log(payLoad);
        resolve(res);
      })
      .catch((error: any) => {
        reject(error);
      });
  });
}
public async deleteSelectedExcludes(payLoad: object): Promise<any> {
  return await new Promise((resolve, reject) => {
    common
      .callApi1('post', trekapi.DeleteSelectedExcludes(), payLoad)
      .then((res: any) => {
        // console.log(res);
        resolve(res);
      })
      .catch((error: any) => {
        reject(error);
      });
  });
}
 // Excludes List in Includes Tab
public async getExcludesList(payLoad: any): Promise<any> {
  return await new Promise((resolve, reject) => {
    common
      .callApi1('post', trekapi.ExcludesList(payLoad.trek_id), payLoad)
      .then((res: any) => {
        // console.log(res);
        resolve(res);
      })
      .catch((error: any) => {
        reject(error);
      });
  });
}
public async addExcludes(payLoad: object): Promise<any> {
  return await new Promise((resolve, reject) => {
    common
      .callApi1('post', trekapi.AddExcludes(), payLoad)
      .then((res: any) => {
        // console.log(res);
        resolve(res);
      })
      .catch((error: any) => {
        reject(error);
      });
  });
}
public async editExclude(payLoad: any): Promise<any> {
  return await new Promise((resolve, reject) => {
    common
      .callApi1('put', trekapi.EditExcludes(), payLoad)
      .then((res: any) => {
        // console.log(res);
        // console.log(payLoad);
        resolve(res);
      })
      .catch((error: any) => {
        reject(error);
      });
  });
}
public async deleteSelectedIncludes(payLoad: object): Promise<any> {
  return await new Promise((resolve, reject) => {
    common
      .callApi1('post', trekapi.DeleteSelectedIncludes(), payLoad)
      .then((res: any) => {
        // console.log(res);
        resolve(res);
      })
      .catch((error: any) => {
        reject(error);
      });
  });
}

// Departures Tab
public async addDeparture(payLoad: any): Promise<any> {
  return await new Promise((resolve, reject) => {
    common
      .callApi1('post', trekapi.AddDeparture(), payLoad)
      .then((res: any) => {
        // console.log(res.data.data);
        resolve(res);
      })
      .catch((error: any) => {
        reject(error);
      });
  });
}
public async editDeparture(payLoad: any): Promise<any> {
  return await new Promise((resolve, reject) => {
    common
      .callApi1('put', trekapi.EditDeparture(payLoad.trek_id), payLoad)
      .then((res: any) => {
        // console.log(res);
        // console.log(payLoad);
        resolve(res);
      })
      .catch((error: any) => {
        reject(error);
      });
  });
}
public async departureList(payLoad: any): Promise<any> {
  return await new Promise((resolve, reject) => {
    common
      .callApi1('post', trekapi.DepartureList(), payLoad)
      .then((res: any) => {
        // console.log(res.data.data);
        resolve(res);
      })
      .catch((error: any) => {
        reject(error);
      });
  });
}
public async departuresList(payLoad: any): Promise<any> {
  return await new Promise((resolve, reject) => {
    common
      .callApi1('post', trekapi.DeparturesList(), payLoad)
      .then((res: any) => {
        // console.log(res.data.data);
        resolve(res);
      })
      .catch((error: any) => {
        reject(error);
      });
  });
}
public async deleteDeparture(payLoad: any): Promise<any> {
  return await new Promise((resolve, reject) => {
    common
    .callApi1('post', trekapi.DeleteDeparture(), payLoad)
    .then((res: any) => {
      // console.log(res.data.data);
      resolve(res);
    })
    .catch((error: any) => {
      reject(error);
    });
  });
}
// Notes Tab
public async getNotes(payLoad: any): Promise<any> {
  return await new Promise((resolve, reject) => {
    common
    .callApi1('post', trekapi.GetNotes(), payLoad)
    .then((res: any) => {
      // console.log(res.data.data);
      resolve(res);
    })
    .catch((error: any) => {
      reject(error);
    });
  });
}
// trek Filter
public async searchTrekByFilter(payLoad: any): Promise<any> {
  return await new Promise((resolve, reject) => {
    common
    .callApi1('post', trekapi.TrekFilter(), payLoad)
    .then((res: any) => {
      // console.log(res);
      resolve(res);
    })
    .catch((error: any) => {
      reject(error);
    });
  });
}
// Departure Filter
public async searchDepartureByFilter(payLoad: any): Promise<any> {
  return await new Promise((resolve, reject) => {
    common
    .callApi1('post', trekapi.DepartureFilter(), payLoad)
    .then((res: any) => {
      // console.log(res);
      resolve(res);
    })
    .catch((error: any) => {
      reject(error);
    });
  });
}
// booking filter
public async searchBookiingByFilter(payLoad: any): Promise<any> {
  return await new Promise((resolve, reject) => {
    common
    .callApi1('post', trekapi.BookingFilter(), payLoad)
    .then((res: any) => {
      // console.log(res);
      resolve(res);
    })
    .catch((error: any) => {
      reject(error);
    });
  });
}
public async bookingList(payLoad: any): Promise<any> {
  return await new Promise((resolve, reject) => {
    common
     .callApi1('post', trekapi.BookingList(), payLoad)
      .then((res: any) => {
            // console.log(res.data.data);
          resolve(res);
       })
      .catch((error: any) => {
        reject(error);
      });
      });
  }
public async bookingDetailsList(payLoad: any): Promise<any> {
  return await new Promise((resolve, reject) => {
    common
     .callApi1('post', trekapi.BookingDetails(), payLoad)
      .then((res: any) => {
            // console.log(res.data.data);
          resolve(res);
       })
      .catch((error: any) => {
        reject(error);
      });
      });
  }
public async updateProfileDetail(payLoad: any): Promise<any> {
  return await new Promise((resolve, reject) => {
    common
     .callApi1('post', trekapi.updateProfile(), payLoad)
      .then((res: any) => {
            // console.log(res.data.data);
          resolve(res);
       })
      .catch((error: any) => {
        reject(error);
      });
      });
  }
public async updatePassword(payLoad: any): Promise<any> {
  return await new Promise((resolve, reject) => {
    common
     .callApi1('post', trekapi.updatePassword(), payLoad)
      .then((res: any) => {
            // console.log(res.data.data);
          resolve(res);
       })
      .catch((error: any) => {
        reject(error);
      });
      });
  }
  public async userDataRetrieve(): Promise<any> {
    return await new Promise((resolve, reject) => {
      common
        .callApi1('get', trekapi.userRetrieve())
        .then((res: any) => {
          // console.log(res.data.data);
          resolve(res);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }
  public async trekRetrievePrice(payLoad: any): Promise<any> {
    return await new Promise((resolve, reject) => {
      common
       .callApi1('post', trekapi.trekRetrieve(), payLoad)
        .then((res: any) => {
              // console.log(res.data.data);
            resolve(res);
         })
        .catch((error: any) => {
          reject(error);
        });
        });
  }
  public async retrieveDepartureAll(payLoad: any): Promise<any> {
    return await new Promise((resolve, reject) => {
      common
       .callApi1('post', trekapi.retrieveDeparture(), payLoad)
        .then((res: any) => {
              // console.log(res.data.data);
            resolve(res);
         })
        .catch((error: any) => {
          reject(error);
        });
        });
  }
  public async priceListDeparture(payLoad: any): Promise<any> {
    return await new Promise((resolve, reject) => {
      common
       .callApi1('post', trekapi.retrievePriceListDeparture(), payLoad)
        .then((res: any) => {
              // console.log(res.data.data);
            resolve(res);
         })
        .catch((error: any) => {
          reject(error);
        });
        });
  }
  public async addPriceDeparture(payLoad: any): Promise<any> {
    return await new Promise((resolve, reject) => {
      common
       .callApi1('post', trekapi.addPriceDeparture(), payLoad)
        .then((res: any) => {
              // console.log(res.data.data);
            resolve(res);
         })
        .catch((error: any) => {
          reject(error);
        });
        });
  }
  public async editPriceDeparture(payLoad: any): Promise<any> {
    return await new Promise((resolve, reject) => {
      common
       .callApi1('put', trekapi.editPriceDeparture(), payLoad)
        .then((res: any) => {
              // console.log(res.data.data);
            resolve(res);
         })
        .catch((error: any) => {
          reject(error);
        });
        });
  }
  public async deletePriceDeparture(payLoad: any): Promise<any> {
    return await new Promise((resolve, reject) => {
      common
       .callApi1('post', trekapi.deletePriceDeparture(), payLoad)
        .then((res: any) => {
              // console.log(res.data.data);
            resolve(res);
         })
        .catch((error: any) => {
          reject(error);
        });
        });
  }
  public async getReviewList(payLoad: any): Promise<any> {
    return await new Promise((resolve, reject) => {
      common
       .callApi1('post', trekapi.fetchReviewList(), payLoad)
        .then((res: any) => {
              // console.log(res.data.data);
            resolve(res);
         })
        .catch((error: any) => {
          reject(error);
        });
        });
  }
  public async downloadPdf(payLoad: any): Promise<any> {
    return await new Promise((resolve, reject) => {
      common
       .callApi1('post', trekapi.fetchPdf(), payLoad)
        .then((res: any) => {
              // console.log(res.data.data);
            resolve(res);
         })
        .catch((error: any) => {
          reject(error);
        });
        });
  }
  
  // Profile / Get Social Media Icons
  public async getSocialMedia(): Promise<any> {
    return await new Promise((resolve, reject) => {
      common
        .callApi1('get', trekapi.GetSocialMediaIcon())
        .then((res: any) => {
          // console.log(res);
          resolve(res);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }
  public async getSocialMediaList(payLoad: any): Promise<any> {
    return await new Promise((resolve, reject) => {
      common
       .callApi1('post', trekapi.fetchSocialMediaList(), payLoad)
        .then((res: any) => {
              // console.log(res.data.data);
            resolve(res);
         })
        .catch((error: any) => {
          reject(error);
        });
        });
  }
  public async postSocialMediaAccount(payLoad: any): Promise<any> {
    return await new Promise((resolve, reject) => {
      common
       .callApi1('post', trekapi.addSocialMedia(), payLoad)
        .then((res: any) => {
              // console.log(res.data.data);
            resolve(res);
         })
        .catch((error: any) => {
          reject(error);
        });
        });
  }
  public async deleteSocialMedia(payLoad: any): Promise<any> {
    return await new Promise((resolve, reject) => {
      common
       .callApi1('post', trekapi.deleteSocialMedia(), payLoad)
        .then((res: any) => {
              // console.log(res.data.data);
            resolve(res);
         })
        .catch((error: any) => {
          reject(error);
        });
        });
  }
  public async addAccountContent(payLoad: any): Promise<any> {
    return await new Promise((resolve, reject) => {
      common
       .callApi1('post', trekapi.addAccountContent(), payLoad)
        .then((res: any) => {
              // console.log(res.data.data);
            resolve(res);
         })
        .catch((error: any) => {
          reject(error);
        });
        });
  }
  public async addAccountContentRetrieve(payLoad: any): Promise<any> {
    return await new Promise((resolve, reject) => {
      common
       .callApi1('post', trekapi.addAccountContentRetrieve(), payLoad)
        .then((res: any) => {
              // console.log(res.data.data);
            resolve(res);
         })
        .catch((error: any) => {
          reject(error);
        });
        });
  }
  public async editSocialMedia(payLoad: any): Promise<any> {
    return await new Promise((resolve, reject) => {
      common
       .callApi1('put', trekapi.editSocialMedia(), payLoad)
        .then((res: any) => {
              // console.log(res.data.data);
            resolve(res);
         })
        .catch((error: any) => {
          reject(error);
        });
        });
  }
  public async getAccountContent(): Promise<any> {
    return await new Promise((resolve, reject) => {
      common
        .callApi1('get', trekapi.fetchAccountContent())
        .then((res: any) => {
          // console.log(res);
          resolve(res);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }
  public async getOfficeDays(): Promise<any> {
    return await new Promise((resolve, reject) => {
      common
        .callApi1('get', trekapi.fetchOfficeDays())
        .then((res: any) => {
          // console.log(res);
          resolve(res);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }
  public async saveOfficeDayandHour(payLoad: any): Promise<any> {
    return await new Promise((resolve, reject) => {
      common
       .callApi1('post', trekapi.addOfficeDayandHour(), payLoad)
        .then((res: any) => {
              // console.log(res.data.data);
            resolve(res);
         })
        .catch((error: any) => {
          reject(error);
        });
        });
  }
// public async getProductById(productId: number) :  Promise<any> 
// {
  //       return await new Promise((resolve, reject) => {
    //         common
    //           .callApi1("get", trekapi.GetDefaultColor(productId))
    //           .then((res: any) => {
      //             // console.log(res);
      //             resolve(res);
      //           })
      //           .catch((error: any) => {
        //             reject(error);
        //           });
        //       });
        // }
}
export const trekService = new TrekService();
