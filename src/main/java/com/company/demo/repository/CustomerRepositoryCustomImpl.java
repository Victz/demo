package com.company.demo.repository;

import com.company.demo.model.ChartModel;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;

public class CustomerRepositoryCustomImpl implements CustomerRepositoryCustom{

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<ChartModel> getChart() {
        Query query = entityManager.createNativeQuery("select year(date_of_birth) as birthyear, count(*) from customer group by birthyear having birthyear >= YEAR(DATE_SUB(CURDATE(), INTERVAL 50 YEAR))");
        List<Object[]> rows = query.getResultList();

        List<ChartModel> chartModels = new ArrayList<>(rows.size());
        for (Object[] row : rows) {
            chartModels.add(new ChartModel(((Integer)row[0]).longValue(),((BigInteger)row[1]).longValue()));
        }
        return chartModels;
    }
}
